import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCallback } from "react";
import { useRouter } from "next/router";
import { Bell } from "lucide-react";
import { useAuth, AuthContextValue } from "@/context/authContext";
import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "@/pages/api/notifications";
import { Notification } from "@/types";

  /*   const { user, logout } = useAuth() as AuthContextValue;
  const handleLogout = useCallback(async () => {
    logout();

    router.push("/");
  }, [logout, router]);
 */

export function NotificationButton() {
  const { isAuthed } = useAuth() as AuthContextValue;
  const router = useRouter();

  const {
    data: notifications,
    isLoading: isNotificationLoading,
    error: notificationError,
  } = useQuery<Notification[]>({
    queryKey: ["notifications", { page: 1, pageAmount: 5 }],
    queryFn: () => getNotifications(1, 5),
    enabled: isAuthed,
  });

  const handleNotifications = () => {
    router.push("/notifications");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isAuthed ? (
          <>
            {isNotificationLoading ? (
              <DropdownMenuItem>Loading notifications...</DropdownMenuItem>
            ) : notificationError ? (
              <DropdownMenuItem>Error loading notifications</DropdownMenuItem>
            ) : notifications?.length === 0 ? (
              <DropdownMenuItem>No notifications</DropdownMenuItem>
            ) : (
              notifications?.slice(0, 5).map((notification) => (
                <DropdownMenuItem key={notification.orderId}>
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