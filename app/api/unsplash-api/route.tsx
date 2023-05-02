import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Math.floor(Math.random() * (100 + 1));
  const per_page = 16;
  const accessKey = process.env.API_KEY;
  const url = `https://api.unsplash.com/search/photos/?page=${page}&per_page=${per_page}&client_id=${accessKey}&query=${searchParams.get("question")}&orientation=landscape`;
  const response = await fetch(url);
  const data = await response.json();
  return NextResponse.json({ data });
};