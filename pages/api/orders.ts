import { axios, setAuthToken } from "./index";
import { Order } from "@/types";
import token_temp from "@/TOKEN";

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (
  page?: number,
  pageAmount?: number
): Promise<Order[]> => {
  try {
    return await axios
      .get(`${baseUrl}/all`, { params: { page, pageAmount } })
      .then((res) => res.data);
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

export const updateOrder = async (
  orderId: any,
  { arg: body }: any
): Promise<Order> => {
  try {
    const response = await axios.put(`${baseUrl}/${orderId}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
