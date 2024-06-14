import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import type {
  Post as PostType,
  Comment as CommentType,
  Vote,
} from "@/app/types/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import InteractionPanel from "@/components/InteractionPanel";
import PaperViewDialog from "@/components/PaperViewDialog";
import Comment from "@/components/Comment";
import CommentSection from "@/components/CommentSection";
import { Tag } from "lucide-react";
import type { UserVoteType } from "@/app/types/types";
import { formatDistanceToNow, parseISO } from "date-fns";

interface PostComponentProps {
  post: PostType;
  descriptionLength: "half" | "full";
  id: string;
  setBookMarkUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const Post: React.FC<PostComponentProps> = ({
  post,
  descriptionLength,
  id,
  setBookMarkUpdate,
}) => {
  const router = useRouter();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [comment, setComment] = useState<string>("");
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [totalUpVotes, setTotalUpVotes] = useState<number>(0);
  const [vote, setVote] = useState<UserVoteType>();
  const [commentMessage, setCommentMessage] = useState<string>("");
  const [triggerFetchComments, setTriggerFetchComments] =
    useState<boolean>(false);
  const maxLengthOfDescription =
    descriptionLength === "half" ? 500 : post?.tests.description.length;

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(`/api/comments/${id}`);
      setComments(response.data);
    };
    fetchComments();
  }, [id, comment, commentMessage, triggerFetchComments]);

  useEffect(() => {
    const getTotalUpVotes = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/votes/${id}/all`);
          setTotalUpVotes(
            response.data.filter((vote: Vote) => vote.upVote).length
          );
        } catch (error) {
          console.error("Error fetching votes:", error);
        }
      }
    };
    getTotalUpVotes();
  }, [vote]);

  useEffect(() => {
    const fetchVotes = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/votes/${id}`);
          setVote(response.data);
        } catch (error) {
          console.error("Error fetching votes:", error);
        }
      }
    };
    fetchVotes();
  }, [id]);

  const handleReadMore = () => {
    router.push(`/home/post/${id}`);
  };

  const handleTakeTest = () => {
    router.push(`tests/${id}`);
  };

  const createdAt = post?.tests?.createdAt;
  console.log(createdAt, "time date");
  const formattedDate = createdAt
    ? formatDistanceToNow(new Date(parseInt(createdAt)), { addSuffix: true })
    : "Unknown time";

  return (
    <div>
      <Card key={id} className="min-w-[55rem] py-6 px-8">
        <div className="flex items-center gap-4">
          <Avatar className="cursor-pointer text-center size-16 flex items-center">
            <AvatarImage className="rounded-lg" src={post?.users?.imgUrl} />
            <AvatarFallback>{post?.users?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="font-semibold">{post?.users?.name}</p>
            <p className="text-gray-300">
              @{post?.users?.userName} | {formattedDate}
            </p>
          </div>
        </div>
        <h3 className="mt-8 text-2xl font-semibold tracking-tight">
          {post?.tests?.title}
        </h3>
        <p className="mt-4 leading-7">
          {post?.tests?.description.length > maxLengthOfDescription
            ? `${post?.tests?.description.slice(0, maxLengthOfDescription)}...`
            : post?.tests?.description}
          {post?.tests?.description.length > maxLengthOfDescription && (
            <Button onClick={handleReadMore} className="-ml-4" variant="link">
              read more
            </Button>
          )}
        </p>
        <div className="mt-4 font-semibold">
          <p className="items-center">
            <div>
              <div className="flex gap-2">
                <Tag className="transform rotate-90" stroke="#A8B3CF" />
                <p>Tags:</p>{" "}
              </div>
              <span className="text-primary mt-2">{post?.tests?.tags}</span>
            </div>
          </p>
          <div className="mt-4 flex gap-4 text-[#A8B3CF]">
            <p>
              {comments.length} Comments | {totalUpVotes} Upvotes
            </p>
          </div>
        </div>
        <div>
          <PaperViewDialog questions={post?.tests?.questions!} />
          <Button onClick={handleTakeTest} className="w-full mt-2">
            Take Test
          </Button>
        </div>
        <div>
          <InteractionPanel
            setBookMarkUpdate={setBookMarkUpdate}
            post={post}
            vote={vote!}
            setVote={setVote}
          />
        </div>
        {descriptionLength === "full" && (
          <>
            <div className="mt-8">
              <Comment
                showTextArea={showTextArea}
                setShowTextArea={setShowTextArea}
                post={post}
                comment={comment}
                setComment={setComment}
              />
            </div>
            <div className="mt-8">
              {comments.length > 0 && (
                <CommentSection
                  commentMessage={commentMessage}
                  setCommentMessage={setCommentMessage}
                  comments={comments}
                  postId={id}
                  setTriggerFetchComments={setTriggerFetchComments}
                />
              )}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};

export default Post;
