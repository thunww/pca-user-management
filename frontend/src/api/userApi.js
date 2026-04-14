import axios from "axios";
import { BASE_URL } from "../constants/config";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      return Promise.reject({
        message: "Network error. Please check your connection.",
      });
    }
    return Promise.reject(error.response.data);
  },
);

export const getUsers = (params) => api.get("/users", { params });

export const createUser = (data) => api.post("/users", data);

export const deleteUser = (id) => api.delete(`/users/${id}`);

export const exportUsers = (ids) =>
  api.post("/users/export", { ids }, { responseType: "blob" });
