import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { BookMarkTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const GET = auth(async function GET(
  req,
  { params }: { params: { postId: string } }
) {
  const userId = req?.auth?.user?.id;

  const response = await db
    .select()
    .from(BookMarkTable)
    .where(
      and(
        eq(BookMarkTable.userId, userId!),
        eq(BookMarkTable.postId, params.postId)
      )
    );

  return Response.json(response);
});
