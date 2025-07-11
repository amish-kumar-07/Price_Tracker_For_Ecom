// app/api/email-worker/route.ts
import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import { NextResponse } from "next/server";
import { transporter, buildMail, sendEmail } from "@/lib/mailer";
import { verifySmtp } from "@/lib/mailer";

// Verify SMTP connection
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
  success?: boolean;
  error?: string;
}[] = [];

export async function GET() {
  try {
    console.log("🚀 Starting email worker...");

    const emailQueue = new Queue("email", { connection });

    const emailWorker = new Worker(
      "email",
      async job => {
        const { asin, email, newPrice, oldPrice, status } = job.data;
        
        console.log("📧 Processing job:", job.data);
        
        try {
          console.log("📧 Building email for:", { asin, email, newPrice, oldPrice, status });
          
          const mailOptions = buildMail({
            asin,
            email,
            newPrice,
            oldPrice,
            status,
          });

          console.log("📤 Sending email with options:", {
            from: mailOptions.from,
            to: mailOptions.to,
            subject: mailOptions.subject
          });

          const result = await sendEmail(mailOptions);
          try {
              await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/price-history`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  asin,
                  currentPrice: newPrice,     // ✅ Match schema field name
                  originalPrice: oldPrice,    // Optional but useful
                  platform: "amazon",         // Optional, if you have this
                }),
              });

              console.log("📦 Price history sent to /api/price-history");
            } catch (apiError: any) {
              console.error("❌ Failed to send price history to endpoint:", apiError);
            }

          
          arr.push({ 
            asin, 
            email, 
            newPrice, 
            oldPrice, 
            status, 
            success: true 
          });

          console.log(`✅ Email sent successfully to ${email} for ASIN ${asin}`, result.messageId);
        } catch (error: any) {
          console.error(`❌ Failed to send email to ${email} for ASIN ${asin}:`, error);
          
          arr.push({ 
            asin, 
            email, 
            newPrice, 
            oldPrice, 
            status, 
            success: false,
            error: error.message 
          });
          
        }
      },
      {
        connection,
        concurrency: 2,
      }
    );

    // Enhanced worker event handling
    emailWorker.on("completed", (job) => {
      console.log(`🏁 Job ${job.id} completed`);
    });

    emailWorker.on("failed", (job, err) => {
      console.error(`💥 Job ${job?.id} failed:`, err);
    });

    // Stop the worker once all jobs are done
    await new Promise<void>((resolve) => {
      emailWorker.on("completed", async () => {
        const waiting = await emailQueue.getWaiting();
        const active = await emailQueue.getActive();
        console.log(`📊 Queue status - Waiting: ${waiting.length}, Active: ${active.length}`);
        
        if (waiting.length === 0 && active.length === 0) {
          console.log("🔚 All jobs completed, closing worker");
          await emailWorker.close();
          resolve();
        }
      });

      // Fallback timeout in case jobs are already empty
      setTimeout(async () => {
        const waiting = await emailQueue.getWaiting();
        const active = await emailQueue.getActive();
        console.log(`⏰ Timeout check - Waiting: ${waiting.length}, Active: ${active.length}`);
        
        if (waiting.length === 0 && active.length === 0) {
          console.log("🔚 Timeout reached, closing worker");
          await emailWorker.close();
          resolve();
        }
      }, 1000);
    });

    return NextResponse.json({ 
      message: "✅ Emails processed", 
      data: arr,
      summary: {
        total: arr.length,
        successful: arr.filter(item => item.success).length,
        failed: arr.filter(item => !item.success).length
      }
    });
  } catch (error: any) {
    console.error("❌ Email worker error:", error);
    return NextResponse.json(
      { error: "❌ Email processing failed", message: error.message },
      { status: 500 }
    );
  }
}