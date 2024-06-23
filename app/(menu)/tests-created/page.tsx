"use client";
import React, { useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Clock } from "lucide-react";
import { Tags } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import type { Test } from "../../types/types";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "react-responsive";

const TestsCreated = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const isTabView = useMediaQuery({
    query: "(min-width: 768px) && (max-width: 1024px)",
  });
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/api/tests");
      setTests(response?.data);
    }
    fetchData();
  }, []);

  const handleSwitchChange = async (testId: string | undefined) => {
    const test = tests.find((test) => test.id === testId);

    if (test) {
      const response = await axios.put("/api/tests", {
        ...test,
        privatePost: !test.privatePost,
      });

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

    if (response.status === 200) {
      setTests((prev) => prev.filter((test) => test.id !== testId));
    }
  };
  return (
    <div className="container mx-auto p-3 sm:p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col items-center">
      {tests.length > 0 &&
        tests.map((test) => (
          <Card
            key={test.id}
            className="md:w-[35rem] lg:w-[55rem] mt-6 cursor-pointer hover:bg-accent dark:hover:bg-slate-900 shadow-sm shadow-gray-400 dark:shadow-none"
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
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-2">
                    <span className="flex items-center gap-2 text-sm sm:text-base">
                      Duration: {test.duration} mins
                    </span>
                  </div>
                  <div className="flex flex-col items-start sm:flex-row sm:items-center sm:gap-2">
                    <span className="flex items-center gap-2 text-sm sm:text-base">
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
                    onClick={() => router.push(`/create-paper/${test.id}/edit`)}
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
                  <Dialog>
                    <DialogTrigger className="w-full">
                      <Button
                        name="delete"
                        className="text-white font-bold py-2 px-4 rounded"
                        variant={"destructive"}
                      >
                        Delete
                      </Button>{" "}
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Delete Post</DialogTitle>
                        <DialogDescription className="text-destructive flex gap-2">
                          Are you sure you want to delete this post.
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
                            className="lucide lucide-trash-2"
                          >
                            <path d="M3 6h18" />
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                            <line x1="10" x2="10" y1="11" y2="17" />
                            <line x1="14" x2="14" y1="11" y2="17" />
                          </svg>
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-1 items-center gap-4">
                          <Label htmlFor="name" className="text-left">
                            Post Title
                          </Label>
                          <Input
                            id="title"
                            defaultValue={test?.title}
                            className="col-span-3"
                            readOnly
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant={"destructive"}
                          onClick={() => handleDelete(test.id)}
                          type="submit"
                        >
                          Delete Post
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
};

export default TestsCreated;
