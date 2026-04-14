import React from "react";

const ExportButton = ({ selectedCount, loading, onExport }) => {
  const disabled = selectedCount === 0 || loading;

  return (
    <button
      onClick={onExport}
      disabled={disabled}
      title={
        selectedCount === 0
          ? "Select users to export"
          : `Export ${selectedCount} user(s)`
      }
      className="px-4 py-2 text-sm rounded border border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {loading
        ? "Exporting..."
        : `Export${selectedCount > 0 ? ` (${selectedCount})` : ""}`}
    </button>
  );
};

export default ExportButton;
