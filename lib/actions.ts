"use server";
import { and, eq } from "drizzle-orm";
import { db } from "./drizzle/db";
import { BookMarkTable, TestsTakenTable } from "./drizzle/schema";
import { TestTable } from "./drizzle/schema";
import { Test } from "@/app/types/types";
import { UserTable } from "./drizzle/schema";

export async function addToBookMark(postId: string, userId: string) {
  const response = await db
    .insert(BookMarkTable)
    .values({ postId: postId, userId: userId })
    .returning();
  console.log(response, "bookmark added");
}

export async function removeBookMark(postId: string, userId: string) {
  const response = await db
    .delete(BookMarkTable)
    .where(
      and(eq(BookMarkTable.postId, postId), eq(BookMarkTable.userId, userId))
    )
    .returning();
  console.log(response, "bookmark removed");
}

export async function getBookMarks(userId: string, postId?: string) {
  
}
