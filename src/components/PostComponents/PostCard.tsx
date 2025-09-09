"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRelativeTime } from "@/lib/date";
import React from "react";
import {
  FaGlobe,
  FaHashtag,
  FaReddit,
  FaTelegram,
  FaTwitter,
} from "react-icons/fa";
import {
  MdSentimentDissatisfied,
  MdSentimentNeutral,
  MdSentimentSatisfied,
} from "react-icons/md";

import type { Post } from "@prisma/client";

type PostCardProps = {
  post: Post;
};

const sentimentIcon = (sentiment: string) => {
  if (sentiment === "BULLISH")
    return <MdSentimentSatisfied className="text-green-600" />;
  if (sentiment === "NEUTRAL")
    return <MdSentimentNeutral className="text-gray-500" />;
  if (sentiment === "BEARISH")
    return <MdSentimentDissatisfied className="text-orange-700" />;
  return <MdSentimentNeutral className="text-gray-400" />;
};

const platformIcon = (source: string) => {
  if (source === "TWITTER") return <FaTwitter className="text-blue-400" />;
  if (source === "REDDIT") return <FaReddit className="text-orange-500" />;
  if (source === "TELEGRAM") return <FaTelegram className="text-blue-500" />;
  return <FaGlobe className="text-gray-400" />;
};

const PostCard: React.FC<PostCardProps> = ({ post }) => (
  <Card className="bg-gradient-to-br from-white via-gray-100 to-blue-50 text-black border-none rounded-2xl shadow-xl hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 w-full max-w-4xl px-6 py-4">
    <CardHeader className="p-2">
      <div className="flex flex-col gap-2">
        {(post.categories?.length || post.subcategories?.length) && (
          <div className="flex gap-2 mb-1 flex-wrap">
            {(post.categories ?? []).map((cat: string, idx: number) => (
              <span
                key={`cat-${idx}`}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold"
              >
                <FaHashtag className="mr-1" />
                {cat}
              </span>
            ))}
            {(post.subcategories ?? []).map((subcat: string, idx: number) => (
              <span
                key={`subcat-${idx}`}
                className="inline-flex items-center px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold"
              >
                <FaHashtag className="mr-1" />
                {subcat}
              </span>
            ))}
          </div>
        )}
        <CardTitle className="text-2xl font-bold tracking-tight leading-snug">
          {post.title}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent className="p-2">
      <div className="mb-3">
        <span className="text-base text-gray-800 italic">
          {post.content && post.content.length > 56
            ? post.content.slice(0, 56) + "..."
            : post.content}
        </span>
      </div>
      <div className="flex items-center mt-2 gap-4">
        <div className="flex h-5 w-28 rounded-full overflow-hidden shadow">
          <div className="flex-1 bg-green-600" />
          <div className="flex-1 bg-gray-300" />
          <div className="flex-1 bg-orange-600" />
        </div>
        <span
          className={`flex items-center gap-1 text-xs font-semibold ${
            post.sentiment === "BULLISH"
              ? "text-green-600"
              : post.sentiment === "BEARISH"
              ? "text-orange-600"
              : "text-gray-500"
          }`}
        >
          {sentimentIcon(post.sentiment)}
          {post.sentiment}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-700">
          {platformIcon(post.source)}
          {post.source}
        </span>
        <span className="flex items-center gap-1 text-xs text-gray-500">
          {/* <FaClock /> Time removed as signalTime is not in schema */}
          {post.createdAt
            ? getRelativeTime(
                typeof post.createdAt === "string"
                  ? post.createdAt
                  : post.createdAt.toISOString()
              )
            : "Invalid date"}
        </span>
      </div>
    </CardContent>
  </Card>
);

export default PostCard;
