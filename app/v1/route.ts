import { NextRequest } from "next/server";
import { example } from "@/lib/api/example";

export async function GET(request: NextRequest) {
  const data = await example();
  return Response.json({ message: data });
}
