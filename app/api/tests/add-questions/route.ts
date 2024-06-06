import { db } from "@/lib/drizzle/db";
import { TestTable } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

export async function PUT(request: Request) {
  const data = await request.json();
  console.log("data: ", data);
  const response = await db
    .update(TestTable)
    .set({ questions: data.questions })
    .where(eq(TestTable.id, data.testId));
  console.log("response: ", response);
  return new Response(
    JSON.stringify({ message: "Added the questions successfully" }),
    {
      status: 200,
    }
  );
}
