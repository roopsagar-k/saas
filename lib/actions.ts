"use server";
import { and, eq } from "drizzle-orm";
import { db } from "./drizzle/db";
import { BookMarkTable, TestsTakenTable } from "./drizzle/schema";
import { TestTable } from "./drizzle/schema";
import { QuestionType } from "@/app/types/types";
import { Test, TestInfo } from "@/app/types/types";
import { UserTable } from "./drizzle/schema";

export async function addToBookMark(postId: string, userId: string) {
  const response = await db
    .insert(BookMarkTable)
    .values({ postId: postId, userId: userId })
    .returning();
}

export async function removeBookMark(postId: string, userId: string) {
  const response = await db
    .delete(BookMarkTable)
    .where(
      and(eq(BookMarkTable.postId, postId), eq(BookMarkTable.userId, userId))
    )
    .returning();
}

export async function insertTestTakenInfo(testInfo: TestInfo, userId: string) {
  const result = await db
    .select({ questions: TestTable.questions })
    .from(TestTable)
    .where(eq(TestTable.id, testInfo.testId!));

  const response = await db
    .select()
    .from(TestsTakenTable)
    .where(
      and(
        eq(TestsTakenTable.testId, testInfo.testId!),
        eq(TestsTakenTable.userId, userId)
      )
    );

  const { questions }: { questions: QuestionType[] } = result[0] as {
    questions: QuestionType[];
  };
  let currentScore = 0;
  testInfo.answers?.forEach((answer) => {
    const questionIndex = answer.questionIndex;
    console.log(questionIndex);
    if (questions[questionIndex].answer === answer.answer.toString()) {
      currentScore += 1;
    }
  });

  
  if (response.length > 0) {
    let highestScore = response[0].highestScore;
    await db
      .update(TestsTakenTable)
      .set({
        testId: testInfo.testId!,
        userId: userId,
        answers: testInfo.answers,
        minutes: testInfo.minutes,
        seconds: testInfo.seconds,
        currentScore: currentScore,
        highestScore: highestScore > currentScore ? highestScore : currentScore,
        totalScore: questions.length,
      })
      .where(
        and(
          eq(TestsTakenTable.testId, testInfo.testId!),
          eq(TestsTakenTable.userId, userId)
        )
      );
  } else {
    await db.insert(TestsTakenTable).values({
      testId: testInfo.testId!,
      userId: userId,
      answers: testInfo.answers,
      minutes: testInfo.minutes,
      seconds: testInfo.seconds,
      currentScore: currentScore,
      highestScore: currentScore,
      totalScore: questions.length,
    });
  }
}
