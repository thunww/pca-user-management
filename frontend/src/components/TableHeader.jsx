import React from "react";
import { SORT_FIELDS } from "../constants/config";

const LABELS = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "Email",
  createdAt: "Created At",
};

const SortIndicator = ({ field, sortBy, sortOrder }) => {
  if (sortBy !== field) return <span className="ml-1 text-gray-400">↕</span>;
  return (
    <span className="ml-1 text-blue-400">
      {sortOrder === "asc" ? "↑" : "↓"}
    </span>
  );
};

const TableHeader = ({
  sortBy,
  sortOrder,
  onSort,
  allSelected,
  indeterminate,
  onSelectAll,
}) => {
  return (
    <thead className="bg-gray-800 text-gray-300 text-sm uppercase tracking-wider">
      <tr>
        <th className="px-4 py-3 w-10">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = indeterminate;
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-4 h-4 cursor-pointer accent-blue-500"
          />
        </th>
        {SORT_FIELDS.filter((f) => f !== "createdAt").map((field) => (
          <th
            key={field}
            onClick={() => onSort(field)}
            className="px-4 py-3 text-left cursor-pointer hover:text-white select-none"
          >
            {LABELS[field]}
            <SortIndicator
              field={field}
              sortBy={sortBy}
              sortOrder={sortOrder}
            />
          </th>
        ))}
        <th className="px-4 py-3 text-left">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHeader;
