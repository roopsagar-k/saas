import { auth } from "@/auth";
import { db } from "@/lib/drizzle/db";
import { NestedCommentsVotesTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";

export const GET = auth(async function GET(
  req,
  { params }: { params: { id: string; nestedId: string } }
) {
  let response = await db
    .select()
    .from(NestedCommentsVotesTable)
    .where(
      and(
        eq(NestedCommentsVotesTable.commentId, params.id),
        eq(NestedCommentsVotesTable.userId, req?.auth?.user.id!),
        eq(NestedCommentsVotesTable.nestedCommentId, params.nestedId)
      )
    );

  const allVotes = await db
    .select()
    .from(NestedCommentsVotesTable)
    .where(
      and(
        eq(NestedCommentsVotesTable.commentId, params.id),
        eq(NestedCommentsVotesTable.nestedCommentId, params.nestedId),
        eq(NestedCommentsVotesTable.upVote, true)
      )
    );
  const count = allVotes.length;

  const commentVotes = {
    upVote: response.length > 0 ? response[0].upVote : false,
    downVote: response.length > 0 ? response[0].downVote : false,
  };
  return Response.json(
    { message: "comments Votes fetched successfully", commentVotes, count },
    { status: 200 }
  );
});
  