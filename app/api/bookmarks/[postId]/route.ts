import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { BookMarkTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const GET = auth(async function GET(
  req,
  { params }: { params: { postId: string } }
) {
  const userId = req?.auth?.user?.id;
  console.log(params.postId, 'postId from shichan')
    const response = await db
      .select()
      .from(BookMarkTable)
      .where(
        and(
          eq(BookMarkTable.userId, userId!),
          eq(BookMarkTable.postId, params.postId)
        )
      );
      console.log(response , "shinchan")
    return Response.json(response);
});