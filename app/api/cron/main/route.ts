import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { notificationSettings } from "@/app/db/schema";
import { Queue } from "bullmq";
import { NextResponse } from "next/server";

const db = drizzle(neon(process.env.DATABASE_URL!));

const API_KEY = "0ffeda8d1cf907c12f14fe61d864090f";
const BASE_URL = "https://api.scraperapi.com";
const notifications = new Queue("jobs");

function cleanPrice(price: string | number): number {
  if (typeof price === "number") return price;
  if (!price || typeof price !== "string") return 0;

  let cleanedPrice = price.replace(/[₹$€£¥,\s]/g, "");

  if (/^\d+(\.\d{1,2})?$/.test(cleanedPrice)) {
    cleanedPrice = cleanedPrice.replace(/[^\d.]/g, "");
  } else {
    cleanedPrice = cleanedPrice.replace(/[^\d]/g, "");
  }

  const num = parseFloat(cleanedPrice);
  return isNaN(num) ? 0 : num;
}


export async function GET() {
  const start = Date.now();

  try {
    const jobs = await db.select().from(notificationSettings);
    if (jobs.length === 0) {
      return new Response(JSON.stringify({ message: "No products to check" }), { status: 200 });
    }
     
    jobs.forEach(job => {
      notifications.add('jobs', { asin: job.asin, email: job.email });
    });
    
    return NextResponse.json({message  : "The jobs are in queue " , data : jobs},{status : 200});

  } catch (err: any) {
    
    return new Response(JSON.stringify({
      error: "GET check failed",
      message: err.message,
    }), { status: 500 });
  }
}