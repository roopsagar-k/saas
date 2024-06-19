"use client";
import axios from '@/axiosConfig';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Post as PostType } from "../../types/types";
import Post from "@/components/Post";


const page = () => {  
    const [posts, setPosts] = useState<PostType[]>([]);
    const search = useSearchParams();
    const searchQuery = search ? search.get('q') : null;
  
    const encodedQuery = encodeURI(searchQuery || "");
    console.log("SEARCH query: ", encodedQuery);
    useEffect(() => {
      async function fetchQueryResults() {
        const response = await axios.get(`/api/search?q=${encodedQuery}`);
        setPosts(response.data.queryResults);
      }
      fetchQueryResults();
    }, [searchQuery]);
  return (
    <div className="container whitespace-pre-wrap mx-auto max-w-md p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center gap-8">
      {posts?.length === 0 ? (
        <div className='w-full text-center text-gray-500'>No results on "{encodedQuery}"</div>
      ):
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
}

export default page
