import { axios } from "./index";
import Error, { ErrorProps } from "next/error";
import { Company } from "@/types";

const baseUrl = `/api/company`;

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    return await axios.get(baseUrl).then((res) => res.data.items);
  } catch (error) {
    throw error;
  }
};