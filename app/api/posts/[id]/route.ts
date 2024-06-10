import { db } from "@/lib/drizzle/db";
import { VotesTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { TestTable } from "@/lib/drizzle/schema";
import { UserTable } from "@/lib/drizzle/schema";

export const PUT = auth(async function PUT(
  req,
  { params }: { params: { id: string } }
) {
  const { operation, val } = await req.json();
  const userId = req.auth?.user?.id!;
  const postId = params.id;

  const result = await db
    .select()
    .from(VotesTable)
    .where(and(eq(VotesTable.postId, postId), eq(VotesTable.userId, userId)));

  if (operation === "upVote") {
    if (result.length === 0) {
      await db.insert(VotesTable).values({
        upVote: val,
        downVote: false,
        userId,
        postId,
      });
    } else {
      const currentVote = result[0];
      await db
        .update(VotesTable)
        .set({
          upVote: val,
          downVote: val ? false : currentVote.downVote,
        })
        .where(and(eq(VotesTable.postId, postId), eq(VotesTable.userId, userId)));
    }
  } else if (operation === "downVote") {
    if (result.length === 0) {
      await db.insert(VotesTable).values({
        downVote: val,
        upVote: false,
        userId,
        postId,
      });
    } else {
      const currentVote = result[0];
      await db
        .update(VotesTable)
        .set({
          downVote: val,
          upVote: val ? false : currentVote.upVote,
        })
        .where( and(eq(VotesTable.postId, postId), eq(VotesTable.userId, userId)));
    }
  }

  return new Response(
    JSON.stringify({
      message: "Vote updated successfully",
    }),
    {
      status: 201,
    }
  );
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("params id", params.id);
  const tests = await db
    .select()
    .from(TestTable)
    .innerJoin(UserTable, eq(TestTable.userId, UserTable.id))
    .where(eq(TestTable.privatePost, false) && eq(TestTable.id, params.id));
  console.log("TEST DATA : ", tests);
  return Response.json({ message: "GET request", tests }, { status: 200 });
}
