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