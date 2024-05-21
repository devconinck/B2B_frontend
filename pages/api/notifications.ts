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



export const markNotificationAsRead = async (
    notificationId: string
  ): Promise<void> => {
    try {
      await axios.put(`${baseUrl}/${notificationId}/read`);
    } catch (error) {
      throw error;
    }
  };
  
export const markAllNotificationsAsRead = async (): Promise<void> => {
    try {
      await axios.put(`${baseUrl}/read-all`);
    } catch (error) {
      throw error;
    }
  };

