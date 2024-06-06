"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
import { Test } from "@/app/types/types";
import axios from "axios";

const DrawerTest = () => {
  const router = useRouter();
  const [ownTest, setOwnTest] = useState(false);
  const [privatePost, setPrivatePost] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log("File changed: ", e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const formData = new FormData();
    // if (file) {
    //   formData.append("file", file);
    //   const response = await axios.post("/api/tests", formData);
    //   console.log("Response: ", response.data);
    // }
    const data: Test = {
      title: e.currentTarget.title.value,
      description: e.currentTarget.description.value,
      duration: parseInt(e.currentTarget.duration.value),
      tags: e.currentTarget.tags.value,
      ownTest: ownTest,
      privatePost: privatePost,
    };
    console.log("data: ", data);
    let testId = "";
    try {
      const res = await axios.post("/api/tests", data);
      testId = res.data.testId;
    } catch (error) {
      console.error("Error creating test: ", error);
    }
    if (data.ownTest) {
      router.push(`/create-paper/${testId}`);
      return;
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <div className="bg-primary p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8"
          >
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
          </svg>
        </div>
      </DrawerTrigger>
      <DrawerContent className="sm:px-[10%] lg:px-[20%]">
        <form onSubmit={(e) => handleSubmit(e)}>
          <DrawerHeader>
            <DrawerTitle>Test creation</DrawerTitle>
            <DrawerDescription>
              Create test by uploading pdf/file or Add the questions and options
              manually
            </DrawerDescription>

            <Card className="flex items-center justify-center relative">
              <CardContent className="flex flex-col items-center justify-center mt-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.5 3.75a6 6 0 0 0-5.98 6.496A5.25 5.25 0 0 0 6.75 20.25H18a4.5 4.5 0 0 0 2.206-8.423 3.75 3.75 0 0 0-4.133-4.303A6.001 6.001 0 0 0 10.5 3.75Zm2.03 5.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 1 0 1.06 1.06l1.72-1.72v4.94a.75.75 0 0 0 1.5 0v-4.94l1.72 1.72a.75.75 0 1 0 1.06-1.06l-3-3Z"
                    clipRule="evenodd"
                  />
                </svg>
                <CardDescription className="text-primary">
                  <p>Choose files or drag and drop</p>
                  <p className="text-center text-white mt-2 underline">
                    {file ? file.name : ""}
                  </p>
                </CardDescription>
              </CardContent>
              <Input
                className="w-full h-full absolute opacity-0"
                id="file"
                name="file"
                onChange={(e) => onFileChange(e)}
                multiple={false}
                type="file"
                disabled={ownTest}
              />
            </Card>
            <div className="flex mt-4 gap-4">
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title"
                  type="text"
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <Label htmlFor="title">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  placeholder="Enter the test duration in minutes"
                />
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                typeof="text"
                id="description"
                name="description"
                placeholder="Share your thoughts about this post..."
              />
            </div>
            <div className="flex flex-col mt-4 gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Add relevant tags (comma-separated)"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Card className="flex flex-col gap-3 items-center text-justify sm:flex-row sm:items-start sm:text-left p-3">
                <div>
                  <CardTitle className="text-md">
                    Compose Your Own Test
                  </CardTitle>
                  <CardDescription>
                    Manually add questions, options, answers, and attach images
                    to create your own question paper.
                  </CardDescription>
                </div>
                <Switch
                  id="own-test"
                  name="ownTest"
                  checked={ownTest}
                  value={ownTest ? "on" : "off"}
                  onCheckedChange={() => setOwnTest(!ownTest)}
                />
              </Card>
              <Card className="flex flex-col gap-3 items-center text-justify sm:flex-row sm:items-start sm:text-left p-3">
                <div>
                  <CardTitle className="text-md">Private post</CardTitle>
                  <CardDescription>
                    By checking this, your post or test will be visible only to
                    those who access them via links, not even to your followers.
                  </CardDescription>
                </div>
                <Switch
                  id="private-post"
                  name="privatePost"
                  value={privatePost ? "on" : "off"}
                  checked={privatePost}
                  onCheckedChange={() => setPrivatePost(!privatePost)}
                />
              </Card>
            </div>
          </DrawerHeader>
          <DrawerFooter>
            <Button type="submit">Submit</Button>
            <DrawerClose>
              <Button variant="outline" className="w-full" type="button">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerTest;