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
import { useState } from "react";

const mockData = [
  {
    id: 1,
    message: "Payment request from Company 6",
    time: "2 hours ago",
    details: "Additional information here",
  },
  {
    id: 2,
    message: "Payment received from Company 9",
    time: "10 min ago",
    details: "Additional information here",
  },
  {
    id: 3,
    message: "Payment request from Company 3",
    time: "1 day ago",
    details: "Additional information here",
  },
  {
    id: 4,
    message: "Payment received from Company 8",
    time: "1 hour ago",
    details: "Additional information here",
  },
  {
    id: 5,
    message: "Payment request from Company 2",
    time: "3 days ago",
    details: "Additional information here",
  },
];

const Notifications: NextPage = () => {
  const [openNotification, setOpenNotification] = useState(0);

  const handleOpenNotification = (id: number) => {
    if (openNotification === id) {
      return setOpenNotification(0);
    }
    setOpenNotification(id);
  };

  return (
    <main className="flex justify-center w-full h-screen">
      <div className="container max-w-3xl px-4 md:px-0 py-8">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Notifications
        </h1>
        <Card>
          <CardHeader className="pb-6">
            <div className="space-y-1.5 flex flex-col sm:flex-row lg:flex-row justify-between">
              <CardDescription className="">
                You have {mockData.length} unread messages.
              </CardDescription>
              <Button className="underline" variant={"ghost"}>
                Mark all as read
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {mockData.map((notification) => (
              <div
                className="border-b border-t border-gray-200 dark:border-gray-800 last:border-0"
                key={notification.id}
              >
                <div className="p-4 grid gap-2">
                  <div className="grid gap-1.5">
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notification.time}
                    </p>
                    {openNotification === notification.id && (
                      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                        {notification.details}
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
  );
};

export default Notifications;
