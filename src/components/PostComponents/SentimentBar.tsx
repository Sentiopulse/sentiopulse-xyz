import React, { useEffect, useState } from "react";
import type { Post, Sentiment } from "@prisma/client";

type SentimentBarProps = {
  info: Post[];
};

const SentimentBar: React.FC<SentimentBarProps> = ({ info }) => {
  const [bullish, setBullish] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bearish, setBearish] = useState(0);

  useEffect(() => {
    const total = info.length;
    const bullishCount = info.filter((p) => p.sentiment === "BULLISH").length;
    const neutralCount = info.filter((p) => p.sentiment === "NEUTRAL").length;
    const bearishCount = info.filter((p) => p.sentiment === "BEARISH").length;
    const bullishPct = total ? (bullishCount / total) * 100 : 0;
    const neutralPct = total ? (neutralCount / total) * 100 : 0;
    const bearishPct = total ? (bearishCount / total) * 100 : 0;

    // Animated count-up for percentages
    const duration = 700;
    const step = 20;
    const timers: number[] = [];
    const clamp = (v: number) => Math.max(0, Math.min(100, v));
    const animate = (target: number, setter: (v: number) => void) => {
      let current = 0;
      const finalTarget = clamp(target);
      const increment = finalTarget / (duration / step);
      const timer = window.setInterval(() => {
        current += increment;
        if (current >= finalTarget) {
          setter(Math.round(finalTarget));
          window.clearInterval(timer);
        } else {
          setter(Math.round(current));
        }
      }, step);
      timers.push(timer);
    };
    animate(bullishPct, setBullish);
    animate(neutralPct, setNeutral);
    animate(bearishPct, setBearish);
    return () => {
      timers.forEach(window.clearInterval);
    };
  }, [info]);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex h-6 w-96 rounded overflow-hidden shadow-lg">
        <div
          className="flex items-center justify-center bg-green-600 text-green-100 text-xs font-bold transition-all duration-700"
          style={{ flex: 1 }}
        >
          {bullish}%
        </div>
        <div
          className="flex items-center justify-center bg-gray-300 text-gray-600 text-xs font-bold transition-all duration-700"
          style={{ flex: 1 }}
        >
          {neutral}%
        </div>
        <div
          className="flex items-center justify-center bg-orange-600 text-orange-100 text-xs font-bold transition-all duration-700"
          style={{ flex: 1 }}
        >
          {bearish}%
        </div>
      </div>
    </div>
  );
};

export default SentimentBar;
