import { db } from "@/lib/drizzle/db";
import { TestTable, UserTable } from "@/lib/drizzle/schema";
import { desc, eq, ne } from "drizzle-orm";

export async function GET() {
  const tests = await db
    .select()
    .from(TestTable)
    .innerJoin(UserTable, eq(TestTable.userId, UserTable.id))
    .where(eq(TestTable.privatePost, false));
  console.log("TEST DATA : ", tests);
  return Response.json({ message: "GET request", tests }, { status: 200 });
}
