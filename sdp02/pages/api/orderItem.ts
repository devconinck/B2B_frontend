import { axios } from "./index";
import { OrderItem } from "@/types"
const baseUrl = `/api/orders`;

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  try {
    return await axios.get(`${baseUrl}/${orderId}/items`).then((res) => res.data.items);
  } catch (error) {
    throw error;
  }
};
