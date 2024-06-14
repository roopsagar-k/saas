import path from "path";
import fs from "fs-extra";
import { pipeline } from "stream";
import { promisify } from "util";
const pipelineAsync = promisify(pipeline);
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  const uploadedFiles: string[] = [];
  const formData = await request.formData();
  const files = formData.getAll("file") as Array<File>;
  console.log("files: ", files);
  const uploadsDir = path.join(process.cwd(), "public/images");
  await fs.ensureDir(uploadsDir);
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileName = `${Date.now()}-${file?.name}`;
    const filePath = path.join(uploadsDir, fileName);
    uploadedFiles.push(fileName);
    await pipelineAsync(file.stream(), fs.createWriteStream(filePath));
  }
  console.log(uploadedFiles, "file uploaded");
  return new Response(
    JSON.stringify({ message: "file uploaded", uploadedFiles }),
    {
      status: 200,
    }
  );
}

export async function PUT(request: NextRequest) {
  const { deletedImages } = await request.json();
  for (let i = 0; i < deletedImages.length; i++) {
    const uploadsDir = path.join(process.cwd(), "public/images");
    const filePath = path.join(uploadsDir, deletedImages[i]);
    await fs.unlink(filePath);
  }
  return new Response("Delete request", { status: 200 });
}
