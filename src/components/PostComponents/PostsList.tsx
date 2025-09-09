"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SentimentBar from "./SentimentBar";
import PostFilters from "./PostFilters";
import { SortField, SortOrder } from "./PostSortSelect";
import Spinner from "./Spinner";
import type { Post } from "@prisma/client";

export default function PostsList() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<Post[]>([]);
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [sourceFilter, setSourceFilter] = useState<string>("all");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const infoFetcher = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sortField) params.append("sort", sortField);
        if (sortOrder) params.append("order", sortOrder);
        if (sentimentFilter && sentimentFilter !== "all")
          params.append("sentiment", sentimentFilter);
        if (sourceFilter && sourceFilter !== "all")
          params.append("source", sourceFilter);
        const res = await fetch(`/api/posts?${params.toString()}`);
        const data = await res.json();
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
  }, [search, sortField, sortOrder, sentimentFilter, sourceFilter]);

  return (
    <>
      <div className="mt-8">
        <PostFilters
          search={search}
          onSearchChange={onChangeHandler}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          onSortOrderChange={setSortOrder}
          sentimentFilter={sentimentFilter}
          onSentimentChange={setSentimentFilter}
          sourceFilter={sourceFilter}
          onSourceChange={setSourceFilter}
        />
      </div>

      {!loading && !error && info.length > 0 && (
        <SentimentBar
          info={info.filter(
            (post) =>
              (sentimentFilter === "all" ||
                post.sentiment === sentimentFilter) &&
              (sourceFilter === "all" || post.source === sourceFilter)
          )}
        />
      )}

      {error && <div className="text-destructive text-center">{error}</div>}

      {loading && (
        <div className="py-8 flex justify-center">
          <Spinner label="Loading posts" />
        </div>
      )}

      {!loading && !error && !info.length && (
        <div className="text-destructive text-center">No Posts Found</div>
      )}

      {!loading && !error && info.length > 0 && (
        <div className="flex flex-col gap-4 items-center">
          {info
            .filter(
              (post) =>
                (sentimentFilter === "all" ||
                  post.sentiment === sentimentFilter) &&
                (sourceFilter === "all" || post.source === sourceFilter)
            )
            .map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      )}
    </>
  );
}
