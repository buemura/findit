import dotenv from "dotenv";
import axios, { AxiosInstance } from "axios";

dotenv.config();

const api: AxiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_API}`,
});

export default api;
