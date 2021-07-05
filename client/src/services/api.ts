import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const api = axios.create({
  baseURL: `${process.env.BACKEND_API}`,
});

export default api;
