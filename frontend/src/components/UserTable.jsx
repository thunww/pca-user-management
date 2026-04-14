import React from "react";
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import Pagination from "./Pagination";

const UserTable = ({
  users,
  loading,
  total,
  page,
  totalPages,
  sortBy,
  sortOrder,
  selectedIds,
  onSort,
  onPageChange,
  onSelectOne,
  onSelectAll,
  onDelete,
}) => {
  const allSelected =
    users.length > 0 && users.every((u) => selectedIds.has(u.id));
  const indeterminate =
    users.some((u) => selectedIds.has(u.id)) && !allSelected;

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <TableHeader
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSort={onSort}
            allSelected={allSelected}
            indeterminate={indeterminate}
            onSelectAll={(checked) =>
              onSelectAll(
                users.map((u) => u.id),
                checked,
              )
            }
          />
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-16 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  user={user}
                  selected={selectedIds.has(user.id)}
                  onSelect={onSelectOne}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        total={total}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserTable;
