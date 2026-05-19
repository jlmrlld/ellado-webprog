import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/articles`,
});

export const fetchArticles = () => API.get("/");
export const createArticle = (data) => API.post("/", data);
export const updateArticle = (id, data) => API.put(`/${id}`, data);