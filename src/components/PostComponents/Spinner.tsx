import React from "react";

interface SpinnerProps {
  size?: number; // pixel size of the spinner
  label?: string; // optional accessible label and visible text
}

export default function Spinner({
  size = 40,
  label = "Loading",
}: SpinnerProps) {
  const borderSize = Math.max(2, Math.round(size / 8));
  return (
    <div
      className="flex items-center justify-center gap-3"
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <div
        className="rounded-full border-t-transparent animate-spin"
        style={{
          width: size,
          height: size,
          borderWidth: borderSize,
          borderStyle: "solid",
          borderColor: "#e5e7eb",
          borderTopColor: "#3b82f6",
        }}
      />
      <span className="text-sm text-gray-600">{label}…</span>
    </div>
  );
}
