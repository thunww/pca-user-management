import React, { useEffect, useState, useCallback } from "react";
import useUsers from "./hooks/useUsers";
import useSelection from "./hooks/useSelection";
import useToast from "./hooks/useToast";
import { createUser, deleteUser, exportUsers } from "./api/userApi";
import { downloadCsv } from "./utils/downloadCsv";
import UserTable from "./components/UserTable";
import SignUpModal from "./components/SignUpModal";
import DeleteModal from "./components/DeleteModal";
import SearchBar from "./components/SearchBar";
import ExportButton from "./components/ExportButton";
import Toast from "./components/Toast";

const App = () => {
  const {
    users,
    total,
    loading,
    error,
    page,
    totalPages,
    sortBy,
    sortOrder,
    fetchUsers,
    handleSort,
    handleSearch,
    handlePageChange,
  } = useUsers();

  const { selectedIds, selectOne, selectAll, removeOne, clear } =
    useSelection();
  const { toast, showToast, hideToast } = useToast();

  const [showSignUp, setShowSignUp] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    clear();
  }, [page]);

  const handleCreateUser = useCallback(
    async (formData) => {
      const { confirmPassword, ...data } = formData;
      await createUser(data);
      await fetchUsers();
      showToast("User created successfully!", "success");
    },
    [fetchUsers, showToast],
  );

  const handleDeleteUser = useCallback(
    async (id) => {
      await deleteUser(id);
      removeOne(id);
      await fetchUsers();
      setUserToDelete(null);
      showToast("User deleted successfully!", "success");
    },
    [fetchUsers, removeOne, showToast],
  );

  const handleExport = useCallback(async () => {
    setExportLoading(true);
    try {
      const ids = [...selectedIds];
      const res = await exportUsers(ids);
      downloadCsv(res.data, "users.csv");
    } catch (err) {
      showToast("Export failed. Please try again.", "error");
    } finally {
      setExportLoading(false);
    }
  }, [selectedIds, showToast]);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">
              PCA User Management
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">{total} total users</p>
          </div>
          <div className="flex items-center gap-3">
            {selectedIds.size > 0 && (
              <span className="text-xs text-blue-400 border border-blue-400/30 bg-blue-400/10 px-2 py-1 rounded">
                {selectedIds.size} selected
              </span>
            )}
            <ExportButton
              selectedCount={selectedIds.size}
              loading={exportLoading}
              onExport={handleExport}
            />
            <button
              onClick={() => setShowSignUp(true)}
              className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              + Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded bg-red-900/30 border border-red-700 text-red-300 text-sm flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={fetchUsers}
              className="text-red-400 underline text-xs"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <UserTable
          users={users}
          loading={loading}
          total={total}
          page={page}
          totalPages={totalPages}
          sortBy={sortBy}
          sortOrder={sortOrder}
          selectedIds={selectedIds}
          onSort={handleSort}
          onPageChange={handlePageChange}
          onSelectOne={selectOne}
          onSelectAll={selectAll}
          onDelete={setUserToDelete}
        />
      </main>

      {/* Export loading overlay */}
      {exportLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-40">
          <div className="bg-gray-900 border border-gray-700 rounded-xl px-8 py-6 text-center">
            <p className="text-white font-medium mb-1">Generating CSV...</p>
            <p className="text-gray-400 text-sm">Please wait</p>
          </div>
        </div>
      )}

      {/* Modals */}
      {showSignUp && (
        <SignUpModal
          onClose={() => setShowSignUp(false)}
          onSubmit={handleCreateUser}
        />
      )}

      {userToDelete && (
        <DeleteModal
          user={userToDelete}
          onClose={() => setUserToDelete(null)}
          onConfirm={handleDeleteUser}
        />
      )}

      {/* Toast */}
      <Toast toast={toast} onHide={hideToast} />
    </div>
  );
};

export default App;
