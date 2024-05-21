import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../api/notifications";
import { NotificationStatus, Notification } from "@/types";

const Notifications = () => {
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(10);
  const [status, setStatus] = useState<NotificationStatus | undefined>(
    undefined
  );
  const router = useRouter();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ["notifications", page, pageAmount, status],
    queryFn: () => getNotifications(page, pageAmount, status),
  });

  const handleOpenNotification = (notificationId: string) => {
    markNotificationAsRead(notificationId);
    const orderId = notifications?.find(
      (notification) => notification.id === notificationId
    )?.orderId;
    if (orderId) {
      router.push(`/orderdetails?orderId=${orderId}`);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  const handleStatusChange = (newStatus: NotificationStatus | undefined) => {
    setStatus(newStatus);
    setPage(1);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <PrivateRoute>
      <main className="flex justify-center w-full h-screen">
        <div className="container max-w-3xl px-4 md:px-0 py-8">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Notifications
          </h1>
          <Card>
            <CardHeader className="pb-6">
              <div className="space-y-1.5 flex flex-col sm:flex-row lg:flex-row justify-between">
                <CardDescription className="">
                  You have {unreadNotifications.length} unread messages.
                </CardDescription>
                <Button
                  className="underline"
                  variant={"ghost"}
                  onClick={handleMarkAllAsRead}
                >
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {notifications?.map((notification: Notification) => (
                <div
                  key={notification.id}
                  className="border-b border-t border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <div className="p-4 grid gap-2">
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.date}
                      </p>
                      {openNotification === notification.id && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                          Notification Type: {notification.notificationType}{" "}
                          <br />
                          Notification Status: {notification.notificationStatus}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        className="font-medium translate-y-0.5"
                        variant={"default"}
                        onClick={() => handleOpenNotification(notification.id)}
                      >
                        {openNotification === notification.id
                          ? "Hide details"
                          : "Show details"}
                      </Button>
                      <Button
                        className="underline"
                        variant={"ghost"}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default Notifications;