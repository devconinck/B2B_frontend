import { axios, setAuthToken } from "./index";
import Error, { ErrorProps } from "next/error";
import { Order } from "@/types";
import token_temp from '@/TOKEN'

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (): Promise<Order[]> => {
  try {
    setAuthToken(
      token_temp
    );
    return await axios.get(`${baseUrl}/all`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};
