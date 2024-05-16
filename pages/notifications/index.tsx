import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PrivateRoute from "@/components/PrivateRoute";
import { getNotifications } from "../api/notifications";
import { NotificationStatus, Notification } from "@/types";


// TODO:
// Warning: Each child in a list should have a unique "key" prop.
// Date goed formatten
// Status updaten new etc
// Long polling
// laatste 5 opvragen
// Mark all as read

const Notifications: NextPage = () => {
  const [openNotification, setOpenNotification] = useState<string | null>(null);

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery<Notification[], Error>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });

  const handleOpenNotification = (notificationId: string | null) => {
    if (openNotification === notificationId) {
      setOpenNotification(null);
    } else {
      setOpenNotification(notificationId);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const unreadNotifications = notifications?.filter(
    (notification: Notification) => notification.NOTIFICATIONSTATUS !== NotificationStatus.READ
  ) || [];

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
                <Button className="underline" variant={"ghost"}>
                  Mark all as read
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {notifications?.map((notification: Notification) => (
                <div
                  key={notification.ID}
                  className="border-b border-t border-gray-200 dark:border-gray-800 last:border-0"
                >
                  <div className="p-4 grid gap-2">
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium">{notification.TEXT}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.DATE}
                      </p>
                      {openNotification === notification.ID && (
                        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                          Notification Type: {notification.NOTIFICATIONTYPE}{" "}
                          <br />
                          Notification Status: {notification.NOTIFICATIONSTATUS}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button
                        className="font-medium translate-y-0.5"
                        variant={"default"}
                        onClick={() => handleOpenNotification(notification.ID)}
                      >
                        {openNotification === notification.ID
                          ? "Hide details"
                          : "Show details"}
                      </Button>
                      <Button className="underline" variant={"ghost"}>
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