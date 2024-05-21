import { axios } from "./index";
import { Notification, NotificationStatus } from "@/types";

const baseUrl = `/api/notifications`;


export const getNotifications = async (
    page?: number,
    pageAmount?: number,
    status?: string,
  ): Promise<Notification[]> => {
    try {
      return await axios
        .get(baseUrl, {
          params: {
            page,
            pageAmount,
            status,
          },
        })
        .then((res) => res.data);
    } catch (error) {
      throw error;
    }
  };

export const getUnreadNotificationsCount = async (): Promise<number> => {
    try {
      const response = await axios.get(`${baseUrl}/unread-count`);
      return response.data.unreadNotificationCount;
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

  export const updateNotificationStatus = async (
    notificationId: string,
    status: NotificationStatus
  ): Promise<void> => {
    try {
      await axios.put(`${baseUrl}/${notificationId}/status`, {
        status,
      });
    } catch (error) {
      throw error;
    }
  };