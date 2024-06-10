import { db } from "@/lib/drizzle/db";
import { VotesTable } from "@/lib/drizzle/schema";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";

export const GET = auth(async function GET(
  req,
  { params }: { params: { id: string } }
) {
  console.log("params id", params.id);
  const votes = await db
    .select()
    .from(VotesTable)
    .where(
      and(
        eq(VotesTable.postId, params.id),
        eq(VotesTable.userId, req.auth?.user?.id!)
      )
    );
  console.log(votes, "votes");
  console.log("postId", params.id);

  const vote = {
    postId: votes.length > 0 ? votes[0].postId : params.id,
    upVote: votes.length > 0 ? votes[0].upVote : false,
    downVote: votes.length > 0 ? votes[0].downVote : false,
  };
  console.log(vote, "vote");

  return new Response(JSON.stringify(vote), {
    status: 200,
  });
});
