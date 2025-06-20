// app/api/email-worker/route.ts
import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import { NextResponse } from "next/server";
import { transporter, buildMail, sendEmail } from "@/lib/mailer";

import { verifySmtp } from "@/lib/mailer";
await verifySmtp();


const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

let arr: {
  asin: string;
  email: string;
  newPrice: number;
  oldPrice: number;
  status: "same" | "decreased" | "increased";
}[] = [];

export async function GET() {
  try {
    console.log("🚀 Starting email worker...");

    const emailQueue = new Queue("email", { connection });

    const emailWorker = new Worker(
      "email",
      async job => {
        const { asin, email, newPrice, oldPrice, status } = job.data;

        const mailOptions = buildMail({
          asin,
          email,
          newPrice,
          oldPrice,
          status,
        });

        await sendEmail(mailOptions);

        arr.push({ asin, email, newPrice, oldPrice, status });

        console.log(`✅ Email sent to ${email} for ASIN ${asin}`);
      },
      {
        connection,
        concurrency: 2,
      }
    );

    // Stop the worker once all jobs are done
    await new Promise<void>((resolve) => {
      emailWorker.on("completed", async () => {
        const waiting = await emailQueue.getWaiting();
        const active = await emailQueue.getActive();
        if (waiting.length === 0 && active.length === 0) {
          await emailWorker.close();
          resolve();
        }
      });

      // Fallback timeout in case jobs are already empty
      setTimeout(async () => {
        const waiting = await emailQueue.getWaiting();
        const active = await emailQueue.getActive();
        if (waiting.length === 0 && active.length === 0) {
          await emailWorker.close();
          resolve();
        }
      }, 1000);
    });

    return NextResponse.json({ message: "✅ Emails processed", data: arr });
  } catch (error: any) {
    return NextResponse.json(
      { error: "❌ Email processing failed", message: error.message },
      { status: 500 }
    );
  }
}
