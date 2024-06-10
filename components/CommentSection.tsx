import React, { useEffect, useRef, useState } from "react";
import type { Comment } from "@/app/types/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import CommentSectionInteractionPannel from "./CommentSectionInteractionPannel";
import CommentTextBox from "./CommentTextBox";
import { useUserContext } from "@/context/UserContext";
import axios from "axios";

interface CommentSectionProps {
  comments: Comment[];
  postId: string;
  commentMessage: string;
  setCommentMessage: React.Dispatch<React.SetStateAction<string>>;
  setTriggerFetchComments: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  postId,
  commentMessage,
  setCommentMessage,
  setTriggerFetchComments,
}) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");
  const [isNestedComment, setIsNestedComment] = useState<boolean>(false);
  const [nestedCommentId, setNestedCommentId] = useState<string>();
  const { user, setUser } = useUserContext();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    recipientId: string
  ) => {
    console.log("clicked");
    await axios.put(`/api/comments/${postId}`, {
      commentMessage,
      commentId,
      recipientId,
    });
    setCommentMessage("");
    setShowTextArea(false);
  };

   const commentRefs = useRef<{ [key: string]: HTMLDivElement }>({});

   useEffect(() => {
     const hash = window.location.hash;
     if (hash) {
       const commentId = hash.substring(1);
       const commentRef = commentRefs.current[commentId];
       if (commentRef) {
         commentRef.scrollIntoView({ behavior: "smooth" });
       }
     }
   }, []);

  return (
    <Card className="relative flex flex-col gap-8">
      {comments.map((comment) => (
        <div
          key={comment.comments.id}
          ref={(ref) => {
            commentRefs.current[comment.comments.id] = ref!;
          }}
        >
          <Card className="p-4" id={`comment-${comment.comments.id}`}>
            <div className="flex items-center overflow-hidden gap-4">
              <Avatar className="cursor-pointer size-12 flex items-center text-center">
                <AvatarImage
                  className="rounded-lg"
                  src="https://github.com/shadcn.png"
                />
                <AvatarFallback className="text-center">{"R"}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center text-sm">
                <p className="font-semibold">{comment?.users.name}</p>
                <p className="text-gray-300">{"@" + comment?.users.userName}</p>
              </div>
            </div>
            <div className="message mt-4 whitespace-pre-wrap">
              {comment?.comments?.message}
            </div>
            <CommentSectionInteractionPannel
              showTextArea={showTextArea}
              setShowTextArea={setShowTextArea}
              id={comment.comments.id}
              setCommentId={setCommentId!}
              nested={false}
              setIsNestedComment={setIsNestedComment}
              showMenu={comment.comments.userId === user?.id}
              commentMessage={comment?.comments?.message}
              setTriggerFetchComments={setTriggerFetchComments}
            />
          </Card>
          <div className="w-[95%] ml-auto">
            {comment?.comments?.nestedComments?.map((nestedComment) => (
              <div key={nestedComment.id} className="flex gap-2">
                <div className="w-1 bg-blue-600 min-h-full"></div>
                <Card
                  id={`comment-${nestedComment.id}`}
                  className="p-4 flex-1 mt-4"
                >
                  <div className="flex items-center overflow-hidden gap-4">
                    <Avatar className="cursor-pointer size-12 flex items-center text-center">
                      <AvatarImage
                        className="rounded-lg"
                        src="https://github.com/shadcn.png"
                      />
                      <AvatarFallback className="text-center">
                        {"R"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col justify-center text-sm">
                      <p className="font-semibold">
                        {nestedComment?.user?.name}
                      </p>
                      <p className="text-gray-300">
                        {"@" + nestedComment?.user?.userName}
                      </p>
                    </div>
                  </div>
                  <div className="message mt-4 whitespace-pre-wrap">
                    <p className="bg-blue-900 text-white font-semibold mb-2 w-max rounded">
                      {"@" + nestedComment?.recipient?.userName}{" "}
                    </p>
                    {nestedComment?.message}
                  </div>
                  <CommentSectionInteractionPannel
                    showTextArea={showTextArea}
                    setShowTextArea={setShowTextArea}
                    id={comment.comments.id}
                    setCommentId={setCommentId!}
                    nested={true}
                    nestedCommentId={nestedComment?.id!}
                    setNestedCommentId={setNestedCommentId}
                    setIsNestedComment={setIsNestedComment}
                    showMenu={nestedComment.userId === user?.id}
                    commentMessage={nestedComment?.message}
                    setTriggerFetchComments={setTriggerFetchComments}
                  />
                </Card>
              </div>
            ))}
          </div>
          <div>
            {showTextArea && (
              <CommentTextBox
                name={user?.name as string}
                showTextArea={showTextArea}
                commentTo={
                  isNestedComment
                    ? comment.comments.nestedComments.find(
                        (n) => n.id === nestedCommentId
                      )?.user.userName
                    : comment.users.userName
                }
                recipientId={
                  isNestedComment
                    ? comment.comments.nestedComments.find(
                        (n) => n.id === nestedCommentId
                      )?.user?.id!
                    : comment.users.id
                }
                comment={commentMessage}
                setComment={setCommentMessage}
                handleClick={handleClick}
              />
            )}
          </div>
        </div>
      ))}
    </Card>
  );
};

export default CommentSection;
