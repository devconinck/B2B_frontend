import { axios, setAuthToken } from "./index";
import Error, { ErrorProps } from "next/error";
import { Order } from "@/types";

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (): Promise<Order[]> => {
  try {
    setAuthToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiQ2hhcmxlcy5sZWNsZXJjQGljbG91ZC5jb20iLCJyb2xlIjoiU1VQUExJRVIiLCJjb21wYW55SWQiOjEsImlhdCI6MTcxNDY2NDc4OCwiZXhwIjoxNzE0NjY4Mzg4LCJhdWQiOiJkZXZlbG9wZXIiLCJpc3MiOiJzZHAtZ3JvZXAyIiwic3ViIjoiYXV0aCJ9.q_Dk-06wiK1M1gDMeK9jHWBEf3JNmi4Cg30ZS60uTSg"
    );
    return await axios.get(`${baseUrl}/all`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
