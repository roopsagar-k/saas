import { db } from "@/lib/drizzle/db";
import { TestTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextApiRequest } from "next";
import path from "path";
import fs from "fs-extra";

export async function GET(req: NextApiRequest, res: any) {
  const { id } = await res.params;
  const tests = await db.select().from(TestTable).where(eq(TestTable.id, id));
  console.log("tests: ", tests);
  return new Response(JSON.stringify(tests[0]), { status: 200 });
}

export async function DELETE(req: NextApiRequest, res: any) {
  const { id } = await res.params;
  await db.delete(TestTable).where(eq(TestTable.id, id as string));
  return new Response(JSON.stringify({ message: "DELETE request" }), {
    status: 200,
  });
}

export async function PUT(req: NextApiRequest, res: any) {
  const { id } = await res.params;
  const { data } = await req?.json();
  console.log("data for put: ", data);
  await db.update(TestTable).set(data).where(eq(TestTable.id, id));
  return new Response(JSON.stringify({ message: "PUT request" }), {
    status: 200,
  });
}
