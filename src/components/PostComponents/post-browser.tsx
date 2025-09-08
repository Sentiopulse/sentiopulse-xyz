"use client";
import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import SentimentBar from "./SentimentBar";
import PostFilters from "./PostFilters";
import { SortField, SortOrder } from "./PostSortSelect";
import Spinner from "./Spinner";

type PostDTO = {
  id: string;
  title: string;
  content: string | null;
  sentiment: string;
  source: string;
  signalTime: string;
};

export default function PostBrowser() {
  const [isMounted, setIsMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<PostDTO[]>([]);
  const [search, setSearch] = useState("");

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // Avoid rendering Radix Selects until after mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
        if (platformFilter && platformFilter !== "all")
          params.append("platform", platformFilter);
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
  }, [search, sortField, sortOrder, sentimentFilter, platformFilter]);

  return (
    <>
      {isMounted ? (
        <PostFilters
          search={search}
          onSearchChange={onChangeHandler}
          sortField={sortField}
          sortOrder={sortOrder}
          onSortFieldChange={setSortField}
          onSortOrderChange={setSortOrder}
          sentimentFilter={sentimentFilter}
          onSentimentChange={setSentimentFilter}
          platformFilter={platformFilter}
          onPlatformChange={setPlatformFilter}
        />
      ) : (
        <div className="flex justify-center py-6">
          <Spinner label="Loading filters" />
        </div>
      )}

      {!loading &&
        !error &&
        info.length > 0 &&
        (() => {
          const filteredInfo = info.filter(
            (post) =>
              (sentimentFilter === "all" ||
                post.sentiment === sentimentFilter) &&
              (platformFilter === "all" || post.source === platformFilter)
          );
          const total = filteredInfo.length;
          if (total === 0) return null;
          const bullish = filteredInfo.filter(
            (p) => p.sentiment === "BULLISH"
          ).length;
          const neutral = filteredInfo.filter(
            (p) => p.sentiment === "NEUTRAL"
          ).length;
          const bearish = filteredInfo.filter(
            (p) => p.sentiment === "BEARISH"
          ).length;
          const bullishPct = Math.round((bullish / total) * 100);
          const neutralPct = Math.round((neutral / total) * 100);
          const bearishPct = Math.round((bearish / total) * 100);
          return (
            <SentimentBar
              bullishPct={bullishPct}
              neutralPct={neutralPct}
              bearishPct={bearishPct}
            />
          );
        })()}

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
                (platformFilter === "all" || post.source === platformFilter)
            )
            .map((post: PostDTO) => (
              <PostCard key={post.id} post={post} />
            ))}
        </div>
      )}
    </>
  );
}
