import * as React from "react";
import {
  Select,
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
      <Select
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as SortField)}
        className="w-[180px]"
      >
        <SelectItem value="sentiment">Sentiment</SelectItem>
        <SelectItem value="createdAt">Created At</SelectItem>
        <SelectItem value="platform">Platform</SelectItem>
      </Select>
      <Select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as SortOrder)}
        className="w-[120px]"
      >
        <SelectItem value="asc">Ascending</SelectItem>
        <SelectItem value="desc">Descending</SelectItem>
      </Select>
    </div>
  );
};
