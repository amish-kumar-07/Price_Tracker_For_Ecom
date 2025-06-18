import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { notificationSettings } from "@/app/db/schema";
import { Queue } from "bullmq";
import { NextResponse } from "next/server";

const db = drizzle(neon(process.env.DATABASE_URL!));
const notifications = new Queue("jobs");

export async function GET() {
  const start = Date.now();

  try {
    const jobs = await db.select().from(notificationSettings);

    if (jobs.length === 0) {
      return new Response(
        JSON.stringify({ message: "No products to check" }),
        { status: 200 }
      );
    }

    jobs.forEach(job => {
      notifications.add("jobs", {
        asin: job.asin,
        email: job.email,
        currentPrice: job.currentPrice, // added
      });
    });

    return NextResponse.json(
      { message: "The jobs are in queue", data: jobs },
      { status: 200 }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        error: "GET check failed",
        message: err.message,
      }),
      { status: 500 }
    );
  }
}
