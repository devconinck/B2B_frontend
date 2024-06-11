import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useRouter } from "next/router";
import { Bell } from "lucide-react";
import { useAuth, AuthContextValue } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import {
  getNotifications,
  getUnreadNotificationsCount,
} from "@/pages/api/notifications";
import { Notification } from "@/types";

export function NotificationButton() {
  const { isAuthed } = useAuth() as AuthContextValue;
  const router = useRouter();
  const currentPage = 1;
  const pageAmount = 5;

  const {
    data: unreadNotificationCount,
    isLoading: isUnreadNotificationCountLoading,
    error: unreadNotificationCountError,
  } = useQuery<number>({
    queryKey: ["unreadNotificationCount"],
    queryFn: getUnreadNotificationsCount,
    enabled: isAuthed,
    refetchInterval: 1 * 1000,
  });

  const {
    data: notifications,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useQuery<Notification[]>({
    queryKey: ["notifications", currentPage, pageAmount],
    queryFn: () => getNotifications(currentPage, pageAmount),
    enabled: isAuthed,
    refetchInterval: 1 * 1000,
  });

  const handleNotifications = () => {
    router.push("/notifications");
  };

  const handleNotificationClick = (orderId: string) => {
    router.push(`/orderdetails?orderId=${orderId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          {unreadNotificationCount && unreadNotificationCount > 0 && (
            <span className="absolute top-0 right-0 flex items-center justify-center bg-red-500 text-white rounded-full w-4 h-4 text-xs">
              {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isAuthed ? (
          <>
            {isNotificationLoading || isUnreadNotificationCountLoading ? (
              <DropdownMenuItem>Loading notifications...</DropdownMenuItem>
            ) : notificationError || unreadNotificationCountError ? (
              <DropdownMenuItem>Error loading notifications</DropdownMenuItem>
            ) : notifications?.length === 0 ? (
              <DropdownMenuItem>No notifications</DropdownMenuItem>
            ) : (
              notifications?.slice(0, 5).map((notification) => (
                <DropdownMenuItem
                  // LATEN STAAN
                  key={notification.orderid}
                  onClick={() => handleNotificationClick(notification.orderid)}
                >
                  {notification.text}
                </DropdownMenuItem>
              ))
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNotifications}>
              See all notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-4">
            <p className="text-center font-semibold">
              You need to be logged in to see notifications
            </p>
            <Button variant={"outline"} onClick={() => router.push("/login")}>
              Go to Login
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
