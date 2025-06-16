import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "@/app/db/schema";

const db = drizzle(process.env.DATABASE_URL!);

export async function GET(request: NextRequest) {
  try {
    const response = await db.select().from(products);

    return NextResponse.json(
      { message: "success", data: response },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("Error found:", err);
    return NextResponse.json(
      { message: "Server Error" },
      { status: 500 }
    );
  }
}
