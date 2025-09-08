import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export type PostDTO = {
  id: string;
  title: string;
  content: string;
  sentiment: string;
  source: string;
  signalTime: string;
  category?: string[];
  subcategory?: string[];
};

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
        signalTime: true,
        sentiment: true,
        category: true,
        subcategory: true,
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
