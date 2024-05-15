import { axios, setAuthToken } from "./index";
import { Order } from "@/types";

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (): Promise<Order[]> => {
  try {
    return await axios.get(`${baseUrl}/all`).then((res) => res.data);
  } catch (error) {
    throw error;
  }
};

export const getOrderById = async (orderId: any): Promise<Order> => {
  try {
    return await axios.get(`${baseUrl}/${orderId}`).then((res) => res.data[0]);
  } catch (error) {
    throw error;
  }
};
