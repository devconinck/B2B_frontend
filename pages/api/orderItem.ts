import { axios } from "./index";
import { OrderItem } from "@/types"
import { setAuthToken } from "./index";
import token_temp from "@/TOKEN";
const baseUrl = `/api/orders`;

export const getOrderItems = async (orderId: string): Promise<OrderItem[]> => {
  try {
    setAuthToken(token_temp)
    const response = await axios.get(`${baseUrl}/${orderId}/items`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
};
