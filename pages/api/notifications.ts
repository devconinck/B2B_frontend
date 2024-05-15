import { axios } from "./index";
import { Notification } from "@/types";

const baseUrl = `/notifications/`;

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
        .then((res) => res.data.items);
    } catch (error) {
      throw error;
    }
  };
