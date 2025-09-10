


import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const params = new URL(req.url).searchParams;
    const search = params.get("search") || undefined;
    const sort = params.get("sort") || "signalTime";
    const order = params.get("order") === "asc" ? "asc" : "desc";
    console.log("Search term received:", search, "Sort:", sort, "Order:", order); // Debug

    // Only allow sorting by certain fields
    const allowedSortFields: Record<string, string> = {
      sentiment: "sentiment",
      createdAt: "signalTime",
      platform: "source",
    };
    const sortField = allowedSortFields[sort] || "signalTime";

    const posts = await prisma.post.findMany({
      where: search
        ? {
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
        }
        : undefined,
      orderBy: {
        [sortField]: order,
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