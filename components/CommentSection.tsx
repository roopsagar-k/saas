import React, { useState } from "react";
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
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  postId,
}) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [commentId, setCommentId] = useState<string>("");
  const [commentMessage, setCommentMessage] = useState<string>("");
  const { user, setUser } = useUserContext();

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    console.log("clicked");
    await axios.put(`/api/comments/${postId}`, { commentMessage, commentId });
    setCommentMessage("");
  };

  return (
    <Card className="relative flex flex-col gap-8">
      {comments.map((comment) => (
        <div key={comment.comments.id}>
          <Card className="p-4">
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
            />
          </Card>
          <div className="w-[95%] ml-auto">
            {comment?.comments?.nestedComments?.map((nestedComment) => (
              <div key={nestedComment.id} className="flex gap-2">
                <div className="w-1 bg-blue-600 min-h-full"></div>
                <Card className="p-4 flex-1 mt-4">
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
                      {"@" + nestedComment?.user?.userName}{" "}
                    </p>
                    {nestedComment?.message}
                  </div>
                  <CommentSectionInteractionPannel
                    showTextArea={showTextArea}
                    setShowTextArea={setShowTextArea}
                    id={comment.comments.id}
                    setCommentId={setCommentId!}
                  />
                </Card>
              </div>
            ))}
          </div>
          <div>
            {showTextArea && commentId === comment.comments.id && (
              <CommentTextBox
                name={user?.name as string}
                showTextArea={showTextArea}
                commentTo={comment.users.userName}
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
