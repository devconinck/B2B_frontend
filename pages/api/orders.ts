import { axios, setAuthToken } from "./index";
import { Order, OrderStatus, PaymentStatus, Role } from "@/types";

const baseUrl = `/api/orders`;

export const getAllOrdersFromCompany = async (params: {
  role: Role;
  companyId: string;
  page?: number;
  pageAmount?: number;
  startDate?: Date;
  endDate?: Date;
  companyName?: string;
  minAmount?: number;
  maxAmount?: number;
  orderReference?: string;
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
}): Promise<Order[]> => {
  try {
    return await axios
      .get(`${baseUrl}/all`, { params })
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
  paymentStatus: any
): Promise<Order> => {
  try {
    const response = await axios.put(`${baseUrl}/${orderId}`, paymentStatus);
    return response.data;
  } catch (error) {
    throw error;
  }
};
