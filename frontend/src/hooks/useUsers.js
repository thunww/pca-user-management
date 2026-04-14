import { useState, useCallback } from "react";
import { getUsers } from "../api/userApi";
import { PAGE_SIZE, SORT_DEFAULTS } from "../constants/config";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState(SORT_DEFAULTS.sortBy);
  const [sortOrder, setSortOrder] = useState(SORT_DEFAULTS.sortOrder);
  const [search, setSearch] = useState("");

  const totalPages = Math.ceil(total / PAGE_SIZE);

  const fetchUsers = useCallback(
    async (overrides = {}) => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          page,
          limit: PAGE_SIZE,
          sortBy,
          sortOrder,
          search,
          ...overrides,
        };
        const res = await getUsers(params);
        setUsers(res.data.data.users);
        setTotal(res.data.data.total);
      } catch (err) {
        setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    },
    [page, sortBy, sortOrder, search],
  );

  const handleSort = useCallback(
    (field) => {
      const newOrder = sortBy === field && sortOrder === "asc" ? "desc" : "asc";
      setSortBy(field);
      setSortOrder(newOrder);
      setPage(1);
    },
    [sortBy, sortOrder],
  );

  const handleSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return {
    users,
    total,
    loading,
    error,
    page,
    totalPages,
    sortBy,
    sortOrder,
    search,
    fetchUsers,
    handleSort,
    handleSearch,
    handlePageChange,
  };
};

export default useUsers;
