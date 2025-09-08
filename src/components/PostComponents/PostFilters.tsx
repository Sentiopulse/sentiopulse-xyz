import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { PostSortSelect, SortField, SortOrder } from "./PostSortSelect";

interface PostFiltersProps {
  search: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
  sentimentFilter: string;
  onSentimentChange: (value: string) => void;
  platformFilter: string;
  onPlatformChange: (value: string) => void;
}

export default function PostFilters({
  search,
  onSearchChange,
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
  sentimentFilter,
  onSentimentChange,
  platformFilter,
  onPlatformChange,
}: PostFiltersProps) {
  return (
    <div className="mb-8 space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <Input
          value={search}
          onChange={onSearchChange}
          placeholder="Search posts..."
          className="w-full max-w-md shadow-md rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
        />
      </div>

      {/* Filters & Sorters Card */}
      <div className="flex flex-wrap justify-between items-center gap-6 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Sorters */}
        <div className="flex flex-col items-center justify-center pl-6 pr-8">
          <label className="text-base font-semibold text-blue-700 mb-2 self-center tracking-wide">
            Sort
          </label>
          <div className="w-40">
            <PostSortSelect
              sortField={sortField}
              sortOrder={sortOrder}
              onSortFieldChange={onSortFieldChange}
              onSortOrderChange={onSortOrderChange}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-6">
          <div className="flex flex-col min-w-[170px]">
            <label className="text-base font-semibold text-purple-500 mb-2">
              Sentiment
            </label>
            <Select value={sentimentFilter} onValueChange={onSentimentChange}>
              <SelectTrigger className="h-11 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition flex items-center">
                <span className="mr-2 text-blue-500">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <path d="M9 9h.01" />
                    <path d="M15 9h.01" />
                  </svg>
                </span>
                <SelectValue placeholder="All sentiments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="BULLISH">Bullish</SelectItem>
                <SelectItem value="NEUTRAL">Neutral</SelectItem>
                <SelectItem value="BEARISH">Bearish</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col min-w-[170px]">
            <label className="text-base font-semibold text-purple-500 mb-2">
              Platform
            </label>
            <Select value={platformFilter} onValueChange={onPlatformChange}>
              <SelectTrigger className="h-11 px-4 border border-gray-300 rounded-lg shadow-sm bg-gray-50 hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition flex items-center">
                <span className="mr-2 text-green-500">
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <rect x="3" y="7" width="18" height="10" rx="2" />
                    <path d="M8 11h.01" />
                    <path d="M16 11h.01" />
                  </svg>
                </span>
                <SelectValue placeholder="All platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="TELEGRAM">Telegram</SelectItem>
                <SelectItem value="TWITTER">Twitter</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
