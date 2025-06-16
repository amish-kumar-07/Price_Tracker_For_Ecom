import { NextRequest, NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { users } from '@/app/db/schema';
import bcrypt from 'bcryptjs';

const db = drizzle(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 });
    }

    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);

    await db.insert(users).values({
      name,
      email,
      passwordHash: hash,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}