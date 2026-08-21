import { ApplicationStatus } from "../types";
import { STATUS_CONFIG } from "../config/statusConfig";

interface SearchFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: ApplicationStatus | "all";
  onStatusFilterChange: (value: ApplicationStatus | "all") => void;
  sortOrder: "newest" | "oldest";
  onSortOrderChange: (value: "newest" | "oldest") => void;
}

function SearchFilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOrder,
  onSortOrderChange,
}: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <input
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by company or position..."
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 flex-1"
      />

      <select
        value={statusFilter}
        onChange={(e) => onStatusFilterChange(e.target.value as ApplicationStatus | "all")}
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All statuses</option>
        {Object.values(ApplicationStatus).map((status) => (
          <option key={status} value={status}>
            {STATUS_CONFIG[status].label}
          </option>
        ))}
      </select>

      <select
        value={sortOrder}
        onChange={(e) => onSortOrderChange(e.target.value as "newest" | "oldest")}
        className="bg-gray-800 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}

export default SearchFilterBar;
