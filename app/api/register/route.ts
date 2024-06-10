import "dotenv/config";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/lib/drizzle/db";
import { UserTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await db
      .select()
      .from(UserTable)
      .where(eq(UserTable.email, email));
    if (result.length > 0) {
      return new NextResponse(
        JSON.stringify({ message: "User already exists" }),
        {
          status: 400,
        }
      );
    }
    const user = await db
      .insert(UserTable)
      .values({
        email: email,
        password: hashedPassword,
      })
      .returning();
    console.log(user);
    return new NextResponse(
      JSON.stringify({ message: "Registration successfull", data: user }),
      { status: 201 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "unknown error: " + error;
    console.log(errorMessage + " error message");
    return new NextResponse(JSON.stringify({ errorMessage: errorMessage }), {
      status: 500,
    });
  }
}
