import { axios } from "./index";
import { Notification } from "@/types";

const baseUrl = `/api/notifications`;


export const getNotifications = async (
    page?: number,
    pageAmount?: number
  ): Promise<Notification[]> => {
    try {
      return await axios
        .get(baseUrl, {
          params: {
            page,
            pageAmount,
          },
        })
        .then((res) => res.data);
    } catch (error) {
      throw error;
    }
  };

