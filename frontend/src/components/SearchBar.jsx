import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value), 400);
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search by name or email..."
        className="bg-gray-800 border border-gray-600 text-gray-200 text-sm rounded px-3 py-2 w-64 focus:outline-none focus:border-blue-500 placeholder-gray-500"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-xs"
        >
          x
        </button>
      )}
    </div>
  );
};

export default SearchBar;
