"use client";
import React, { useEffect } from "react";
import Index from "@/components/Index";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
import { useState } from "react";
import type { Test } from "../types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TestsCreated = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/tests");
      setTests(response?.data);
      console.log("tests: ", tests);
    }
    fetchData();
  }, []);

  const handleSwitchChange = async (testId: string | undefined) => {
    const test = tests.find((test) => test.id === testId);
    console.log(test);
    if (test) {
      const response = await axios.put("/api/tests", {
        ...test,
        privatePost: !test.privatePost,
      });
      console.log("response: ", response.data);
      if (response.status === 200) {
        setTests((prev) =>
          prev.map((test) =>
            test.id === testId
              ? { ...test, privatePost: !test.privatePost }
              : test
          )
        );
      }
    }
  };

  const handleDelete = async (testId: string | undefined) => {
    const response = await axios.delete(`/api/tests/${testId}`);
    console.log("response: ", response.data);
    if (response.status === 200) {
      setTests((prev) => prev.filter((test) => test.id !== testId));
    }
  };
  return (
    <Index>
      <div className="container mx-auto p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center">
        {tests.length > 0 &&
          tests.map((test) => (
            <Card
              key={test.id}
              className="w-[1020px] mt-6 cursor-pointer hover:bg-accent dark:hover:bg-slate-900 shadow-sm shadow-gray-400 dark:shadow-none"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle className="sm:text-md md:text-lg lg:text-xl">
                    {test.title}
                  </CardTitle>
                  <span className="flex gap-4 items-center mx-3">
                    private:
                    <Switch
                      checked={test.privatePost}
                      onCheckedChange={() => handleSwitchChange(test.id)}
                    />
                  </span>
                </div>
              </CardHeader>
              <CardContent className="-mt-4">
                <CardDescription>
                  {" "}
                  {test.description.length > 400
                    ? test.description.slice(0, 400) + "..."
                    : test.description}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-between items-center">
                  <div className="flex gap-3">
                    <div>
                      <span className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          name="clock"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-clock"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        Duration : {test.duration} minutes |
                      </span>
                    </div>
                    <div>
                      <span className="flex gap-2 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          name="tag"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-tag"
                        >
                          <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
                          <circle
                            cx="7.5"
                            cy="7.5"
                            r=".5"
                            fill="currentColor"
                          />
                        </svg>
                        Tags:{" "}
                        {test.tags.length > 40
                          ? test.tags.slice(0, 40) + "..."
                          : test.tags}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mx-3">
                    <Button
                      name="edit"
                      variant={"secondary"}
                      className="font-bold py-2 px-4 rounded mx-2"
                      onClick={() =>
                        router.push(`/create-paper/${test.id}/edit`)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-pencil"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        <path d="m15 5 4 4" />
                      </svg>
                    </Button>
                    <Button
                      name="take test"
                      className="text-white font-bold py-2 px-4 rounded mx-2"
                      onClick={() => router.push(`tests/${test.id}`)}
                    >
                      Take test
                    </Button>
                    <Button
                      name="delete"
                      className="text-white font-bold py-2 px-4 rounded"
                      variant={"destructive"}
                      onClick={() => handleDelete(test.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </Index>
  );
};

export default TestsCreated;
