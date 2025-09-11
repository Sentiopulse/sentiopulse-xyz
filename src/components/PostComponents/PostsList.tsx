"use client";
import { useEffect, useState, useRef, useCallback } from "react";
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
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Fetch posts (initial and paginated)
  const fetchPosts = useCallback(
    async (cursor?: string, reset = false) => {
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
        params.append("limit", "10");
        if (cursor) params.append("cursor", cursor);
        const res = await fetch(`/api/posts?${params.toString()}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error);
          setInfo([]);
          setHasMore(false);
        } else {
          setError(null);
          setHasMore(data.hasMore);
          setNextCursor(data.nextCursor);
          setInfo((prev) => (reset ? data.data : [...prev, ...data.data]));
        }
      } catch {
        setError("An error occurred while fetching posts.");
        setInfo([]);
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [search, sortField, sortOrder, sentimentFilter, sourceFilter]
  );

  // Initial fetch or filter change
  useEffect(() => {
    setInfo([]);
    setNextCursor(null);
    setHasMore(true);
    fetchPosts(undefined, true);
  }, [search, sortField, sortOrder, sentimentFilter, sourceFilter, fetchPosts]);

  // Infinite scroll observer
  useEffect(() => {
    if (!hasMore || loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading && nextCursor) {
        fetchPosts(nextCursor);
      }
    });
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }
    return () => observer.current?.disconnect();
  }, [hasMore, loading, nextCursor, fetchPosts]);

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
          {/* Infinite scroll trigger */}
          {hasMore && (
            <div ref={loadMoreRef} className="py-4">
              {loading ? (
                <Spinner label="Loading more posts" />
              ) : (
                <span>Loading more...</span>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
