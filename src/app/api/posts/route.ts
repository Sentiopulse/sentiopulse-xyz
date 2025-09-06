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
    let posts;
    if (search) {
      console.log("Running full-text search query..."); // Debug query execution
      posts = await prisma.$queryRaw<PostDTO[]>`
        SELECT "id", "title", "content", "sentiment", "source", "signalTime" AS "signalTime"
        FROM "Post"
        WHERE to_tsvector('english', "content" || ' ' || "title") @@ plainto_tsquery('english', ${search})
      `;
      console.log("Search results:", posts); // Debug search results
      // Convert signalTime to ISO string
      posts = posts.map((post) => ({
        ...post,
        signalTime: new Date(post.signalTime).toISOString(),
      }));
    } else {
      posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          content: true,
          source: true,
          signalTime: true,
          sentiment: true,
        },
      });
      posts = posts.map((post) => ({
        ...post,
        signalTime:
          post.signalTime instanceof Date
            ? post.signalTime.toISOString()
            : post.signalTime,
      }));
    }
    if (posts.length === 0) {
      return NextResponse.json({ error: "No Posts Found" }, { status: 404 });
    }
    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
