"use client";
import React, { useEffect, useState } from "react";

type SentimentBarProps = {
  info: Array<{ sentiment: string }>;
};

const SentimentBar: React.FC<SentimentBarProps> = ({ info }) => {
  const total = info.length;
  const bullish = info.filter((p) => p.sentiment === "BULLISH").length;
  const neutral = info.filter((p) => p.sentiment === "NEUTRAL").length;
  const bearish = info.filter((p) => p.sentiment === "BEARISH").length;
  const bullishPct = total ? Math.round((bullish / total) * 100) : 0;
  const neutralPct = total ? Math.round((neutral / total) * 100) : 0;
  const bearishPct = total ? Math.round((bearish / total) * 100) : 0;

  // Count-up for percentages
  const [bullishAnim, setBullish] = useState(0);
  const [neutralAnim, setNeutral] = useState(0);
  const [bearishAnim, setBearish] = useState(0);

  useEffect(() => {
    setBullish(Math.round(bullishPct));
    setNeutral(Math.round(neutralPct));
    setBearish(Math.round(bearishPct));
  }, [bullishPct, neutralPct, bearishPct]);

  // Derived widths from animated values (ensure total = 100%)
  const clampPct = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
  const bullW = clampPct(bullishAnim);
  const neutW = clampPct(neutralAnim);
  const bearW = Math.max(0, 100 - (bullW + neutW));

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex h-6 w-full max-w-xl rounded overflow-hidden shadow-lg">
        <div
          className="flex items-center justify-center bg-green-600 text-green-100 text-xs font-bold transition-all duration-700"
          style={{ width: `${bullW}%` }}
        >
          {bullishPct}%
        </div>
        <div
          className="flex items-center justify-center bg-gray-300 text-gray-600 text-xs font-bold transition-all duration-700"
          style={{ width: `${neutW}%` }}
        >
          {neutralPct}%
        </div>
        <div
          className="flex items-center justify-center bg-orange-600 text-orange-100 text-xs font-bold transition-all duration-700"
          style={{ width: `${bearW}%` }}
        >
          {bearishPct}%
        </div>
      </div>
    </div>
  );
};

export default SentimentBar;
