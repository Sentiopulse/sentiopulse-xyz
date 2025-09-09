"use client";
import { Input } from "@/components/ui/input";
import type { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import PostCard from "../../components/PostComponents/PostCard";
import SentimentBar from "../../components/PostComponents/SentimentBar";

export default function FetchPost() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Post[]>([]);
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
    <div className="container mx-auto py-8 px-4 bg-white font-sans">
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

      {/* Sentiment percentage bar */}
      {!loading && !error && info.length > 0 && <SentimentBar info={info} />}

      {error && <div className="text-destructive text-center">{error}</div>}

      {loading && <div className="text-center">Loading Posts...</div>}

      {!loading && !error && !info.length && (
        <div className="text-destructive text-center">No Posts Found</div>
      )}

      {!loading && !error && info.length > 0 && (
        <div className="flex flex-col gap-4 items-center">
          {info.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
