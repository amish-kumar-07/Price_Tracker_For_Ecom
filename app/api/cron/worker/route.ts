import { Worker } from "bullmq";
import { Queue } from "bullmq";
import IORedis from "ioredis";
import { NextResponse } from "next/server";

const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

function cleanPrice(price: string | number): number {
  if (typeof price === "number") return price;
  if (!price || price.trim() === "") return 0;

  let cleanedCash = price.replace(/[\p{Sc},]/gu, "").trim();
  let ans = "";

  for (let i = 0; i < cleanedCash.length; i++) {
    if (cleanedCash[i] !== ",") {
      ans += cleanedCash[i];
    }
  }

  return parseInt(ans);
}

const myMap = new Map();
const API = "0ffeda8d1cf907c12f14fe61d864090f";

const jobQueue = new Queue("jobs", { connection });
const emailQueue = new Queue("email", { connection });
connection.ping().then(res => console.log("Redis PING:", res)); // should log: PONG

export async function GET() {
  try {
    await new Promise<void>((resolve, reject) => {
      const worker = new Worker(
        "jobs",
        async job => {
          console.log("🔔 Job data received:", job.data);
          const { asin, currentPrice, lastUpdated, frequency, email } = job.data;

          try {
            const response = await fetch(
              `https://api.scraperapi.com?api_key=${API}&url=https://www.amazon.in/dp/${asin}&autoparse=true&country_code=in`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await response.json();
            const newPriceRaw = data?.pricing;
            const newPrice = cleanPrice(newPriceRaw);

            let finalCurrentPrice = cleanPrice(currentPrice);
            if (!finalCurrentPrice || finalCurrentPrice === 0) {
              finalCurrentPrice = newPrice;
              console.warn(`⚠️ No valid currentPrice for ASIN ${asin}, using newPrice as fallback.`);
            }

            let status: "same" | "increased" | "decreased" = "same";
            if (newPrice > finalCurrentPrice) status = "increased";
            else if (newPrice < finalCurrentPrice) status = "decreased";

            const changed = newPrice !== finalCurrentPrice;

            console.log(`💰 ${asin} ➜ Old: ${finalCurrentPrice}, New: ${newPrice}, Status: ${status}`);

            myMap.set(asin, {
              oldPrice: finalCurrentPrice,
              newPrice,
              changed,
              status,
            });

            // ✅ Email logic only if price is same or decreased
            if ((status === "same" || status === "decreased") && lastUpdated && frequency) {
                    const lastHour = new Date(lastUpdated).getHours();
                    const currentHour = new Date().getHours();
                    const hourDiff = (currentHour - lastHour + 24) % 24;

                  if (hourDiff >= frequency) {
                    console.log(`📧 YES – ${frequency}hr mark hit for ASIN ${asin}. Send email to ${email}`);

                    // ✅ Enqueue the job to email queue
                    try {
                      await emailQueue.add("send-email", {
                            asin,
                            email,
                            newPrice,
                            oldPrice: finalCurrentPrice,
                            status,
                            lastUpdated,
                            frequency,
                          });
                    } catch (error) {
                          console.error("❌ Failed to add job to email queue:", error);
                    }


                  } else {
                    console.log(`⏳ WAIT – Only ${hourDiff}hr passed for ASIN ${asin}, not sending mail`);
                  }
                }


            return;
          } catch (err: any) {
            console.error("❌ Error in worker:", err.message);
            throw new Error("Price check failed for ASIN: " + asin);
          }
        },
        {
          connection,
          concurrency: 1,
        }
      );

      const jobQueue = new Queue("jobs", { connection });

      worker.on("completed", async () => {
        const waiting = await jobQueue.getWaiting();
        const active = await jobQueue.getActive();

        if (waiting.length === 0 && active.length === 0) {
          await worker.close();
          resolve();
        }
      });



      worker.on("failed", async (_job, err) => {
        await worker.close();
        reject(err);
      });
    });

    return NextResponse.json(
      {
        message: "✅ All jobs processed",
        data: Object.fromEntries(myMap),
      },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "❌ Job processing failed", message: err.message },
      { status: 500 }
    );
  }
}
