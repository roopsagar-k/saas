import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req) {
  if (req.auth) {
    return NextResponse.json(req.auth.user);
  }
  return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
});