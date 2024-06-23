"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Post as PostType } from "../../types/types";
import Post from "@/components/Post";

const Home = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const maxLengthOfDescription = 500;
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/posts");

      setPosts(response.data.tests);
    }
    fetchData();
  }, []);
  return (
    <div className="container whitespace-pre-wrap mx-auto max-w-md p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center gap-8">
      {posts?.length > 0 &&
        posts?.map((post) => (
          <Post
            key={post.tests.id}
            id={post.tests.id!}
            post={post}
            descriptionLength={"half"}
          />
        ))}
    </div>
  );
};

export default Home;

//bookmark
//home
