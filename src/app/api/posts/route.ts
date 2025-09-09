import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type PostDTO = {
  id: string;
  title: string;
  content: string | null;
  sentiment: string;
  source: string;
  categories?: string[];
  subcategories?: string[];
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
        sentiment: true,
        categories: true,
        subcategories: true,
        createdAt: true,
      },
    });
    console.log("Search results:", posts); // Debug search results
    return NextResponse.json(
      {
        data: posts,
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
