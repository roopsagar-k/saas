"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Index from "@/components/Index";
import axios from "axios";
import { Post as PostType } from "@/app/types/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import PaperViewDialog from "@/components/PaperViewDialog";
import { Tag } from "lucide-react";
import InteractionPanel from "@/components/InteractionPanel";
import { Button } from "@/components/ui/button";

import Post from "@/components/Post";
const PostPage = () => {
  const { id } = useParams();

  const [post, setPost] = useState<PostType>();
 
  useEffect(() => {
    async function fetchData() {
      const [response] = await Promise.all([axios.get(`/api/posts/${id}`)]);
      setPost(response.data.tests[0]);
    }
    fetchData();
  }, []);

  return (
    <Index>
      <div className="container whitespace-pre-wrap mx-auto max-w-md p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center gap-8">
        <Post post={post!} descriptionLength={"full"} id={id as string} />
      </div>
    </Index>
  );
};

export default PostPage;
