"use client";
import PostCard from "../../components/PostComponents/PostCard";
import SentimentBar from "../../components/PostComponents/SentimentBar";
import PostFilters from "../../components/PostComponents/PostFilters";
import { useEffect, useState } from "react";

import {
  SortField,
  SortOrder,
} from "../../components/PostComponents/PostSortSelect";

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

  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  // Filter states
  const [sentimentFilter, setSentimentFilter] = useState<string>("all");
  const [platformFilter, setPlatformFilter] = useState<string>("all");

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const infoFetcher = async () => {
      setLoading(true);
      try {
        console.log("Search query:", search); // Debug search value
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (sortField) params.append("sort", sortField);
        if (sortOrder) params.append("order", sortOrder);
        const res = await fetch(`/api/posts?${params.toString()}`);
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
  }, [search, sortField, sortOrder, sentimentFilter, platformFilter]);

  return (
    <div className="container mx-auto py-8 px-4 bg-white font-sans">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
        Posts
      </h1>

      {/* Search and Filters Section */}
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

      {/* Sentiment percentage bar */}
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

      {loading && <div className="text-center">Loading Posts...</div>}

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
            .map((post: PostDTO, index: number) => (
              <PostCard key={index} post={post} />
            ))}
        </div>
      )}
    </div>
  );
}
