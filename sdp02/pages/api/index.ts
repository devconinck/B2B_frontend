import axiosRoot from "axios";

const baseUrl = process.env.NEXT_PUBLIC_URL
  ? process.env.NEXT_PUBLIC_URL
  : "http://localhost:9000";

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});
