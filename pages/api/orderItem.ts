import { axios } from "./index";
import { OrderItem } from "@/types";
const baseUrl = `/api/orders`;

export const getOrderItems = async (orderId: any): Promise<OrderItem[]> => {
  try {
    const response = await axios.get(`${baseUrl}/${orderId}/items`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order items:", error);
    return [];
  }
};
