export const BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const PAGE_SIZE = 8;

export const SORT_DEFAULTS = {
  sortBy: "createdAt",
  sortOrder: "desc",
};

export const SORT_FIELDS = ["firstName", "lastName", "email", "createdAt"];
