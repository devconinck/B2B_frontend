import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  updateNotificationStatus,
} from "../api/notifications";
import { Notification, NotificationStatus } from "@/types";
import { useToast } from "@/components/ui/use-toast";

const NewNotifications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[]>({
    queryKey: ["newNotifications"],
    queryFn: () => getNotifications(1, 50, NotificationStatus.NEW),
    enabled: true,
    refetchInterval: 30 * 1000,
  });

  useEffect(() => {
    if (!isLoading && !error && notifications?.length) {
      const updateNotifications = async () => {
        await Promise.all(
          notifications.map(async (notification): Promise<void> => {
            toast({
              title: notification.notificationType.toString(),
              description: notification.text,
              duration: 3000,
            });

            await updateNotificationStatus(
              notification.id,
              NotificationStatus.UNREAD
            );
          })
        );

        await queryClient.invalidateQueries({
          queryKey: ["newNotifications"],
        });
      };

      updateNotifications();
    }
  }, [isLoading, error, notifications, toast, queryClient]);

  return null;
};

export default NewNotifications;
