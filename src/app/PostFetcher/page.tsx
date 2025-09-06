"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

type PostDTO = {
  id: string;
  title: string;
  content: string | null;
  sentiment: string;
  source: string;
  signalTime: string;
};

export default function FetchPost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PostDTO[]>([]);
  const [search, setSearch] = useState("");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const infoFetcher = async () => {
      setLoading(true);
      try {
        console.log("Search query:", search); // Debug search value
        const res = await fetch(
          `/api/posts${search ? `?search=${encodeURIComponent(search)}` : ""}`
        );
        const data = await res.json();
        console.log("API response:", data); // Debug API response

        if (!res.ok) {
          setError(data.error);
          setInfo([]);
        } else {
          setError(null);
          setInfo(data.data);
        }
      } catch {
        setError("An error occurred while fetching posts.");
        setInfo([]);
      } finally {
        setLoading(false);
      }
    };
    infoFetcher();
  }, [search]);

  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
        Posts
      </h1>
      <div className="mb-4 flex justify-center">
        <Input
          value={search}
          onChange={onChangeHandler}
          placeholder="Search posts..."
          className="w-full max-w-md"
        />
      </div>

      {error && <div className="text-destructive text-center">{error}</div>}

      {loading && <div className="text-center">Loading Posts...</div>}

      {!loading && !error && !info.length && (
        <div className="text-destructive text-center">No Posts Found</div>
      )}

      {!loading && !error && info.length > 0 && (
        <div className="flex flex-row flex-wrap justify-center gap-4">
          {info.map((post: PostDTO, index: number) => (
            <Card
              key={index}
              className="bg-black text-white border border-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-48"
            >
              <CardHeader className="p-2 border-b border-gray-700">
                <CardTitle className="text-sm font-bold">
                  {post.title}
                </CardTitle>
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
      )}
    </div>
  );
}
