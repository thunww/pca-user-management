import React from "react";

const TableRow = ({ user, selected, onSelect, onDelete }) => {
  return (
    <tr
      className={`border-t border-gray-700 transition-colors ${selected ? "bg-blue-900/20" : "hover:bg-gray-800"}`}
    >
      <td className="px-4 py-3">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => onSelect(user.id, e.target.checked)}
          className="w-4 h-4 cursor-pointer accent-blue-500"
        />
      </td>
      <td className="px-4 py-3 text-gray-200">{user.firstName}</td>
      <td className="px-4 py-3 text-gray-200">{user.lastName}</td>
      <td className="px-4 py-3 text-gray-400">{user.email}</td>
      <td className="px-4 py-3">
        <button
          onClick={() => onDelete(user)}
          className="text-sm text-red-400 border border-red-400/40 px-3 py-1 rounded hover:bg-red-400/10 transition-colors"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
