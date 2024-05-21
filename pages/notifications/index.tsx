import {
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import PrivateRoute from "@/components/PrivateRoute";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
  getUnreadNotificationsCount,
} from "../api/notifications";
import { NotificationStatus, Notification } from "@/types";
import { useRouter } from "next/router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const Notifications = () => {
  const queryClient = useQueryClient();
  
  const [page, setPage] = useState(1);
  const [pageAmount, setPageAmount] = useState(10);
  const [status, setStatus] = useState<NotificationStatus | undefined>(
    undefined
  );
  const [openNotification, setOpenNotification] = useState<string | null>(null);
  const router = useRouter();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ["notifications", page, pageAmount, status],
    queryFn: () => getNotifications(page, pageAmount, status),
  });

  const {
    data: unreadNotificationCount,
    isLoading: isUnreadNotificationCountLoading,
    error: unreadNotificationCountError,
  } = useQuery<number>({
    queryKey: ["unreadNotificationCount"],
    queryFn: getUnreadNotificationsCount,
    refetchInterval: 1 * 1000,
  });

  const handleOpenNotification = (notificationId: string | null) => {
    if (openNotification === notificationId) {
      setOpenNotification(null);
    } else {
      setOpenNotification(notificationId);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    queryClient.refetchQueries({
      queryKey: ['notifications']
    });
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
    queryClient.refetchQueries({
      queryKey: ['notifications'],
    });
  };

  const handleStatusChange = (newStatus: NotificationStatus | undefined) => {
    setStatus(newStatus);
    setPage(1);
  };

  const navigateToOrder = (orderId: string) => {
    router.push(`/orderdetails?orderId=${orderId}`);
  };

  if (isLoading || isUnreadNotificationCountLoading) {
    return <div>Loading...</div>;
  }

  if (error || unreadNotificationCountError) {
    return <div>Error: {error?.message || unreadNotificationCountError?.message}</div>;
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
                  You have {unreadNotificationCount} unread messages.
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
              <div className="mb-4">
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={undefined}> All</SelectItem>
                    <SelectItem value={NotificationStatus.UNREAD}>
                      Unread
                    </SelectItem>
                    <SelectItem value={NotificationStatus.READ}>
                      Read
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                      {notification.orderid && (
                        <Button
                          className="underline"
                          variant={"ghost"}
                          onClick={() =>
                            navigateToOrder(notification.orderid.toString())
                          }
                        >
                          View order
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex items-center space-x-6 lg:space-x-8">
                <div className="flex-items-center space-x-2">
                  <p className="text-sm font-medium">Rows per page</p>
                </div>
                <Select
                  value={`${pageAmount}`}
                  onValueChange={(value) => setPageAmount(Number(value))}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={pageAmount.toString()} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((size) => (
                      <SelectItem key={size} value={size.toString()}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                  Page {page} of{" "}
                  {notifications
                    ? Math.ceil(notifications.length / pageAmount)
                    : 1}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={
                      notifications
                        ? page >= Math.ceil(notifications.length / pageAmount)
                        : true
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </PrivateRoute>
  );
};

export default Notifications;