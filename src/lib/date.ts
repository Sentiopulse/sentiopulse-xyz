import { DateTime } from "luxon";

export function getRelativeTime(dateString: string): string {
  const date = DateTime.fromISO(dateString);
  if (!date.isValid) return "Invalid date";
  return date.toRelative() || "";
}
