import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type PostDTO = {
  id: string;
  title: string;
  content: string;
  sentiment: string;
  source: string;
  signalTime: string;
};

export async function GET(req: Request) {
  try {
    const { search } = Object.fromEntries(new URL(req.url).searchParams);
    console.log("Search term received:", search); // Debug search term

    const posts = await prisma.post.findMany({
      where: search ? {
        OR: [
          {
            title: {
              contains: search,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: search,
              mode: "insensitive",
            },
          },
        ],
      } : undefined,
      select: {
        id: true,
        title: true,
        content: true,
        source: true,
        signalTime: true,
        sentiment: true,
      },
    });
    console.log("Search results:", posts); // Debug search results
    // Convert signalTime to ISO string
    return NextResponse.json(
      {
        data: posts.map((post) => ({
          ...post,
          signalTime: new Date(post.signalTime).toISOString(),
        })),
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
