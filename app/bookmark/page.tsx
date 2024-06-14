"use client";
import React, { useEffect, useState } from "react";
import Index from "@/components/Index";
import { getBookMarks } from "@/lib/actions";
import { useUserContext } from "@/context/UserContext";
import type { BookMarkJoinType, Post as PostType } from "../types/types";
import Post from "@/components/Post";
import axios from "@/axiosConfig";

const BookMark = () => {
  const { user } = useUserContext();
const [bookMarks, setBookMarks] = useState<BookMarkJoinType[]>();
const [bookMarkUpdate, setBookMarkUpdate] = useState<boolean>(false);
useEffect(() => {
  async function fetchBookMarks() {
    const response = await axios.get(`api/bookmarks`);
    setBookMarks(response?.data);
  }
  fetchBookMarks();
}, [bookMarkUpdate]);
  return (
    <Index>
      <div className="container whitespace-pre-wrap mx-auto max-w-md p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center gap-8">
        {bookMarks?.length! > 0 &&
          bookMarks?.map((post) => (
            <Post
              key={post?.tests?.id}
              id={post?.tests?.id!}
              post={post as PostType}
              descriptionLength={"half"}
              setBookMarkUpdate={setBookMarkUpdate}
            />
          ))}
      </div>
    </Index>
  );
};

export default BookMark;
