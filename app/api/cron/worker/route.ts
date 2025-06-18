// /app/api/cron/worker/route.ts

import { Worker } from "bullmq";
import IORedis from "ioredis";
import { NextResponse } from "next/server";

// Redis setup
const connection = new IORedis({
  host: "localhost",
  port: 6379,
  maxRetriesPerRequest: null,
});

export async function GET() {
  try {
    // Wrap worker in a Promise to return job result
    const jobData = await new Promise<any>((resolve, reject) => {
      const worker = new Worker(
        "jobs",
        async job => {
          console.log("🔔 Job data received:", job.data);
          return job.data;
        },
        {
          connection,
          concurrency: 1,
        }
      );

      // Success
      worker.on("completed", async (_job, returnvalue) => {
        await worker.close();
        resolve(returnvalue);
      });

      // Error
      worker.on("failed", async (_job, err) => {
        await worker.close();
        reject(err);
      });
    });

    return NextResponse.json(
      { message: "Job processed successfully", data: jobData },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Job processing failed", message: err.message },
      { status: 500 }
    );
  }
}
