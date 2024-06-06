"use client";
import React, { useState } from "react";
import Questions from "@/components/Questions";
import type { QuestionType } from "@/app/types/types";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";

const createPaper = () => {
  const { id: testId } = useParams();
  const router = useRouter();
  const [questions, setQuestions] = useState<QuestionType[]>([
    {
      question: "",
      options: [{ option: "" }, { option: "" }],
      answer: "",
    },
  ]);

  const [deletedImages, setDeletedImages] = useState<string[]>([]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Submit");
    await axios.put("/api/upload", { deletedImages });
    const response = await axios.put("/api/tests/add-questions", {
      questions,
      testId,
    });
    console.log("Response: ", response.data);
    if (response.status === 200) {
      alert("Questions added successfully");
      router.replace("/tests-created");
    }
  };

  return (
    <div className="px-[20%] py-8">
      <h1 className="scroll-m-20 text-gray-600 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Design Your Question Paper
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Whether you're preparing for an exam, conducting a quiz, our intuitive
        interface makes it easy to tailor question papers to your exact
        specifications, if the question consist any diagrams so you have a
        option to attach image for each question. Start crafting your unique
        question papers today and elevate your learning experience like never
        before!
      </p>
      <div className="flex flex-col gap-2 mt-4">
        <Questions
          questions={questions}
          setQuestions={setQuestions}
          deletedImages={deletedImages}
          setDeletedImages={setDeletedImages}
        />
      </div>
      <Button
        className="w-full mt-2"
        variant={"secondary"}
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
    </div>
  );
};

export default createPaper;
