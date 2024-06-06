import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/drizzle/db";
import { CommentsTable, UserTable } from "@/lib/drizzle/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { ChildrenComment } from "@/app/types/types";

export const PUT = auth(async function PUT(
  req,
  { params }: { params: { id: string } }
) {
  const { commentMessage, commentId } = await req.json();
  const comment = await db
    .select()
    .from(CommentsTable)
    .where(eq(CommentsTable.id, commentId));
  let nestComments = comment[0].nestedComments;
  if (nestComments === null) {
    nestComments = [];
  }
  nestComments.push({
    id: uuidv4(),
    message: commentMessage,
    createdAt: Date.now(),
    userId: req.auth?.user?.id!,
    postId: params.id,
  });
  await db
    .update(CommentsTable)
    .set({ nestedComments: nestComments })
    .where(eq(CommentsTable.id, commentId));
  return new Response(
    JSON.stringify({
      message: "comment added successfully",
    }),
    {
      status: 201,
    }
  );
});

export const POST = auth(async function POST(
  req,
  { params }: { params: { id: string } }
) {
  const { comment } = await req.json();
  await db.insert(CommentsTable).values({
    message: comment,
    postId: params.id,
    userId: req.auth?.user?.id!,
  });
  return new Response(
    JSON.stringify({
      message: "comment added successfully",
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
  const comments = await db
    .select()
    .from(CommentsTable)
    .innerJoin(UserTable, eq(CommentsTable.userId, UserTable.id))
    .where(eq(CommentsTable.postId, params.id));

  const commentsWithNestedUserDetails = await Promise.all(
    comments.map(async (comment) => {
      let nestedComments = comment.comments.nestedComments || [];

      const nestedCommentsWithUserDetails = await Promise.all(
        nestedComments.map(async (nestedComment) => {
          const user = await db
            .select()
            .from(UserTable)
            .where(eq(UserTable.id, nestedComment.userId))
            .then((res) => res[0]);

          return {
            ...nestedComment,
            user,
          };
        })
      );

      return {
        ...comment,
        comments: {
          ...comment.comments,
          nestedComments: nestedCommentsWithUserDetails,
        },
      };
    })
  );

  return new Response(JSON.stringify(commentsWithNestedUserDetails), {
    status: 200,
  });
}
