import * as React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

export type SortField = "sentiment" | "createdAt" | "platform";
export type SortOrder = "asc" | "desc";

interface PostSortSelectProps {
  sortField: SortField;
  sortOrder: SortOrder;
  onSortFieldChange: (field: SortField) => void;
  onSortOrderChange: (order: SortOrder) => void;
}

export const PostSortSelect: React.FC<PostSortSelectProps> = ({
  sortField,
  sortOrder,
  onSortFieldChange,
  onSortOrderChange,
}) => {
  return (
    <div className="flex gap-4 items-center">
      <Select value={sortField} onValueChange={onSortFieldChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="sentiment">Sentiment</SelectItem>
          <SelectItem value="createdAt">Created At</SelectItem>
          <SelectItem value="platform">Platform</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortOrder} onValueChange={onSortOrderChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
