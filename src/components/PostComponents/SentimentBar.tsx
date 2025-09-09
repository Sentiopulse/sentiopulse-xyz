import React, { useEffect, useState } from "react";

type SentimentBarProps = {
  bullishPct: number;
  neutralPct: number;
  bearishPct: number;
};

const SentimentBar: React.FC<SentimentBarProps> = ({
  bullishPct,
  neutralPct,
  bearishPct,
}) => {
  // Animated count-up for percentages
  const [bullish, setBullish] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bearish, setBearish] = useState(0);

  useEffect(() => {
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
  }, [bullishPct, neutralPct, bearishPct]);

  // Derived widths from animated values (ensure total = 100%)
  const clampPct = (v: number) => Math.max(0, Math.min(100, Math.round(v)));
  const bullW = clampPct(bullish);
  const neutW = clampPct(neutral);
  const bearW = Math.max(0, 100 - (bullW + neutW));

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex h-6 w-full max-w-xl rounded overflow-hidden shadow-lg">
        <div
          className="flex items-center justify-center bg-green-600 text-green-100 text-xs font-bold transition-all duration-700"
          style={{ width: `${bullW}%` }}
        >
          {bullish}%
        </div>
        <div
          className="flex items-center justify-center bg-gray-300 text-gray-600 text-xs font-bold transition-all duration-700"
          style={{ width: `${neutW}%` }}
        >
          {neutral}%
        </div>
        <div
          className="flex items-center justify-center bg-orange-600 text-orange-100 text-xs font-bold transition-all duration-700"
          style={{ width: `${bearW}%` }}
        >
          {bearish}%
        </div>
      </div>
    </div>
  );
};

export default SentimentBar;
