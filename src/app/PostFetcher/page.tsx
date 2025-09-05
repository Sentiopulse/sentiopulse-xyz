"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Post } from "@/generated/prisma";

export default function FetchPost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Post[]>([]);

  useEffect(() => {
    const infoFetcher = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts");
        const data = await res.json();

        if (!res.ok) {
          setError(data.error);
          setInfo([]);
        } else {
          setError(null);
          setInfo(data.data); // Use the array from the API response
        }
      } catch {
        setError("An error occurred while fetching posts.");
        setInfo([]);
      } finally {
        setLoading(false);
      }
    };
    infoFetcher();
  }, []);

  if (error) {
    return <div className="text-destructive">{error}</div>;
  }
  if (loading) {
    return <div>Loading Posts...</div>;
  }
  if (!info.length) {
    return <div className="text-destructive">No Posts Found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
        Posts
      </h1>
      <div className="flex flex-row flex-wrap justify-center gap-4">
        {info.map((post: Post, index: number) => (
          <Card
            key={index}
            className="bg-black text-white border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-48"
          >
            <CardHeader className="p-2 border-b border-gray-700">
              <CardTitle className="text-sm font-bold">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <p className="text-xs mb-1">
                <strong>Content:</strong> {post.content}
              </p>
              <p className="text-xs mb-1">
                <strong>Sentiment:</strong> {post.sentiment}
              </p>
              <p className="text-xs mb-1">
                <strong>Source:</strong> {post.source}
              </p>
              <p className="text-xs mb-1">
                <strong>Signal Time:</strong>{" "}
                {new Date(post.signalTime).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
