import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma, Sentiment, Source } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const params = new URL(req.url).searchParams;
    const search = params.get("search") || undefined;
    const sort = params.get("sort") || "createdAt";
    const order = params.get("order") === "asc" ? "asc" : "desc";
    const sentiment = params.get("sentiment") || undefined;
    const source = params.get("source") || undefined;
    const cursor = params.get("cursor") || undefined;
    const limitParam = parseInt(params.get("limit") || "10");
    const limit = Math.min(Math.max(limitParam || 10, 1), 100); // Clamp between 1 and 100

    const where: Prisma.PostWhereInput = {};
    if (search) {
      where.OR = [
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
      ];
    }
    if (sentiment) {
      where.sentiment = sentiment as Sentiment;
    }
    if (source) {
      where.source = source as Source;
    }

    const posts = await prisma.post.findMany({
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      where: Object.keys(where).length ? where : undefined,
      orderBy: {
        [sort]: order,
      },
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

    // Get the next cursor (ID of the last post)
    const nextCursor = posts.length > 0 ? posts[posts.length - 1].id : null;

    return NextResponse.json(
      {
        data: posts,
        nextCursor,
        hasMore: posts.length === limit,
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