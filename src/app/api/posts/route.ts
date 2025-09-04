import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      select: {
        title: true,
        content: true,
        source: true,
        signalTime: true,
        published: true,
        sentiment: true,
      },
    });
    if (posts.length === 0) {
      return NextResponse.json({ error: "No Posts Found" }, { status: 404 });
    }
    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
