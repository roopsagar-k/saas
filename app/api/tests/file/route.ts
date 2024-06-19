import { db } from "@/lib/drizzle/db";
import { TestTable } from "@/lib/drizzle/schema";
import { Test } from "@/app/types/types";
import { auth } from "@/auth";
import { GoogleAIFileManager } from "@google/generative-ai/files";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs-extra";
import path from "path";
import { pipeline } from "stream";
import { promisify } from "util";

export const POST = auth(async function POST(req) {
  let id: string = "";
  if (req.auth) {
    id = req.auth?.user?.id!;
  }

  const formData = await req.formData();
  const textFile: File = formData.get("file") as File;
  const dataString = formData.get("data");

  try {
    if (typeof dataString === "string") {
      const data: Test = JSON.parse(dataString);

      // Save file
      const pipelineAsync = promisify(pipeline);
      const uploadsDir = path.join(process.cwd(), "uploads");
      await fs.ensureDir(uploadsDir);
      const filePath = path.join(uploadsDir, textFile.name);
      console.log("filePath: ", filePath);
      await pipelineAsync(textFile.stream(), fs.createWriteStream(filePath));

      // Create google file manager
      const fileManager = new GoogleAIFileManager(
        process.env.GEMINI_API_KEY as string
      );
      const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY as string
      );

      const uploadFile = await fileManager.uploadFile(filePath, {
        mimeType: "text/plain",
        displayName: textFile?.name,
      });
      console.log(
        `Uploaded file ${uploadFile.file.displayName} as: ${uploadFile.file.uri}`
      );

      const model = genAI.getGenerativeModel({
        // The Gemini 1.5 models are versatile and work with multimodal prompts
        model: "gemini-1.5-flash",
      });

      // Generate content using text and the URI reference for the uploaded file.
      const result = await model.generateContent([
        {
          fileData: {
            mimeType: uploadFile.file.mimeType,
            fileUri: uploadFile.file.uri,
          },
        },
        {
          text: 'Convert the given text from a PDF into a JS array of objects in the format [{question: "", answer: optionNumber(1,2..) , options: [{option: ""},{option: ""}]}] with answers. Correct any unusual symbols, including math signs, and symbols commonly used in physics and chemistry to their proper forms. Provide the actual forms of these symbols (e.g., for exponentiation, use "²" instead of "^2" or "<sup>2</sup>"). Only provide the array of objects without any variable initialization or additional text, and do not wrap the response in triple backticks or HTML tags. Give me in formate that is json parsable.',
        },
      ]);
      console.log("Gemini Result: ", result.response);
      let jsonString = result.response.text().trim();
      jsonString = jsonString.replace(/```/g, "").replace(/[^\x20-\x7E]/g, "");
      console.log("JSON String: ", jsonString);
      const arrayOfObjects = JSON.parse(jsonString);
      console.log("Array of Objects: ", arrayOfObjects);

      // Clean up: delete the uploaded file from Google AI file manager
      await fileManager.deleteFile(uploadFile.file.name);

      // Insert data into the database
      const response = await db
        .insert(TestTable)
        .values({
          title: data.title,
          description: data.description,
          duration: data.duration,
          tags: data.tags,
          ownTest: data.ownTest,
          privatePost: data.privatePost,
          userId: id,
          questions: arrayOfObjects,
          createdAt: Date.now().toString(),
        })
        .returning({ testId: TestTable.id });

      return new Response(
        JSON.stringify({
          message: "test created successfully",
          testId: response[0].testId,
          result: result,
          jsonString: jsonString,
        }),
        {
          status: 201,
        }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Invalid data",
        }),
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return new Response(
      JSON.stringify({
        message: "An error occurred while processing the request",
        error: error instanceof Error ? error.message : error,
      }),
      {
        status: 500,
      }
    );
  }
});
