import type { Post } from "@/app/types/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import InteractionPanel from "@/components/InteractionPanel";
import PaperViewDialog from "@/components/PaperViewDialog";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Comment from "@/components/Comment";
import CommentSection from "@/components/CommentSection";
import type { Comment as CommentType } from "@/app/types/types";

interface PostComponentProps {
  post: Post;
  descriptionLength: string;
  id: string;
}

const Post: React.FC<PostComponentProps> = ({
  post,
  descriptionLength,
  id,
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>("");
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  let maxLengthOfDescription: number;
  if (descriptionLength === "half") {
    maxLengthOfDescription = 500;
  } else {
    maxLengthOfDescription = post?.tests.description.length;
  }
  useEffect(() => {
    async function fetchComments() {
      const response = await axios.get(`/api/comments/${id}`);
      console.log(response.data);
      setComments(response.data);
    }
    fetchComments();
  }, [comment, comments]);
  return (
    <div>
      <Card key={post?.tests?.id} className="min-w-[55rem] py-6 px-8">
        <div className="flex items-center overflow-hidden gap-4">
          <Avatar className="cursor-pointer text-center size-16 flex items-center ">
            <AvatarImage
              className="rounded-lg"
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>{post?.users?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{post?.users?.name}</p>
            <p className="text-gray-300">{"@" + post?.users?.userName}</p>
          </div>
        </div>
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          {post?.tests?.title}
        </h3>
        <p className="leading-7 mt-4">
          {post?.tests?.description.length > maxLengthOfDescription
            ? post?.tests?.description.slice(0, maxLengthOfDescription) + "..."
            : post?.tests?.description}
          {post?.tests?.description.length > maxLengthOfDescription && (
            <Button
              onClick={() => router.push(`/home/post/${post?.tests?.id}`)}
              className="-ml-4"
              variant="link"
            >
              read more
            </Button>
          )}
        </p>
        <div className="mt-4 font-semibold">
          <p className="flex gap-2 items-center">
            <Tag className="transform rotate-90" stroke="#A8B3CF" />
            {"Tags: "}
            <span className="text-primary">{post?.tests?.tags}</span>
          </p>
          <div className="flex mt-4 gap-4 text-[#A8B3CF]">
            <p>{comments?.length + " " + "Comments"}</p>
          </div>
        </div>
        <div>
          <PaperViewDialog questions={post?.tests?.questions!} />
          <Button
            onClick={() => router.push(`tests/${post?.tests?.id}`)}
            className="w-full mt-2"
          >
            Take Test
          </Button>
        </div>
        <div>
          <InteractionPanel post={post} />
        </div>
        {descriptionLength === "full" && (
          <>
            <div className="mt-8">
              <Comment
                showTextArea={showTextArea}
                setShowTextArea={setShowTextArea}
                post={post as Post}
                comment={comment}
                setComment={setComment}
              />
            </div>
            <div className="mt-8">
              {comments.length > 0 && (
                <CommentSection comments={comments} postId={id as string} />
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Post;
