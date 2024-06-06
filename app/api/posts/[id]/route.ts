import { db } from "@/lib/drizzle/db";
import { TestTable, UserTable } from "@/lib/drizzle/schema";
import { desc, eq, ne } from "drizzle-orm";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
    console.log("params id",params.id)
  const tests = await db
    .select()
    .from(TestTable)
    .innerJoin(UserTable, eq(TestTable.userId, UserTable.id))
    .where(eq(TestTable.privatePost, false) && eq(TestTable.id, params.id));
  console.log("TEST DATA : ", tests);
  return Response.json({ message: "GET request", tests }, { status: 200 });
}
