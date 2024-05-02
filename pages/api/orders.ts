import { axios, setAuthToken } from "./index";
import Error, { ErrorProps } from "next/error";
import { Order } from "@/types";

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (): Promise<Order[]> => {
  try {
    setAuthToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiQ2hhcmxlcy5sZWNsZXJjQGljbG91ZC5jb20iLCJyb2xlIjoiU1VQUExJRVIiLCJjb21wYW55SWQiOjEsImlhdCI6MTcxNDYzNzQ0MywiZXhwIjoxNzE0NjQxMDQzLCJhdWQiOiJkZXZlbG9wZXIiLCJpc3MiOiJzZHAtZ3JvZXAyIiwic3ViIjoiYXV0aCJ9.DmOL0eRDAEvIesroSblm-OKfzYW3KgBs4N4-v48Hs6E"
    );
    return await axios.get(`${baseUrl}/all`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
