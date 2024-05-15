import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { getNotifications } from "../api/notifications";
import { NotificationStatus, NotificationType, Notification } from "@/types";

const Notifications: NextPage = () => {
  const [openNotification, setOpenNotification] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await getNotifications();
        setNotifications(fetchedNotifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  const handleOpenNotification = (orderId: string | null) => {
    if (openNotification === orderId) {
      setOpenNotification(null);
    } else {
      setOpenNotification(orderId);
    }
  };

  const unreadNotifications = notifications.filter(
    (notification) => notification.notificationStatus !== NotificationStatus.READ
  );

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
              {notifications.map((notification) => (
                <div
                  className="border-b border-t border-gray-200 dark:border-gray-800 last:border-0"
                  key={notification.orderId ?? ""}
                >
                  <div className="p-4 grid gap-2">
                    <div className="grid gap-1.5">
                      <p className="text-sm font-medium">{notification.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {notification.date}
                      </p>
                      {openNotification === notification.orderId && (
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
                        onClick={() => handleOpenNotification(notification.orderId)}
                      >
                        {openNotification === notification.orderId
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