import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { dir } from "@/app/db/schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);
const API = "";

interface user{
    asin : string,
    dircription : string,
    userId : number
}

export async function POST(req: NextRequest) {
  try {
    const asin = await req.json();
    if (!asin) {
      return new NextResponse("ASIN is required", { status: 400 });
    }

    const res = await fetch(
      `https://api.scraperapi.com?api_key=${API}&url=https://www.amazon.in/dp/${asin}&autoparse=true&country_code=in`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await res.json();
    console.log(result);

    // Optional: Validate required fields in result
    if (!result.small_description) {
      return new NextResponse("Missing description in scraped data", { status: 502 });
    }

    await db.insert(dir).values({
      asin,
      dircription: result.small_description,
      userId: 1,
    });

    return NextResponse.json({ success: true, asin });
  } catch (err) {
    console.error("Error fetching price history:", err);
    return new NextResponse("Failed to fetch price history", { status: 500 });
  }
}
