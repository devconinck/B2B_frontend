import { axios, setAuthToken } from "./index";
import Error, { ErrorProps } from "next/error";
import { Company, Order } from "@/types";

const baseUrl = `/api/orders`;

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    return await axios.get(`/api/company`).then((res) => res.data.items);
  } catch (error) {
    throw error;
  }
};

export const getAllOrdersFromCompany = async (): Promise<Order[]> => {
  try {
    console.log("test");
    setAuthToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImVtYWlsIjoiQ2hhcmxlcy5sZWNsZXJjQGljbG91ZC5jb20iLCJyb2xlIjoiU1VQUExJRVIiLCJjb21wYW55SWQiOjEsImlhdCI6MTcxNDU4MDcyNCwiZXhwIjoxNzE0NTg0MzI0LCJhdWQiOiJkZXZlbG9wZXIiLCJpc3MiOiJzZHAtZ3JvZXAyIiwic3ViIjoiYXV0aCJ9.Q0E4Iqp4TTtk5rkgXoyLIWV2fQrgNlaXtaK_VPAF7tM"
    );
    return await axios.get(`${baseUrl}/all`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
