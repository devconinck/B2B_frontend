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

export function NotificationButton() {
  const { isAuthed } = useAuth() as AuthContextValue;
  const router = useRouter();
  /*   const { user, logout } = useAuth() as AuthContextValue;
  const handleLogout = useCallback(async () => {
    logout();

    router.push("/");
  }, [logout, router]);
 */
  /*
Hier alle notifications ophalen en tonen in een lijst
*/
  const notifications = [
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4",
    "Notification 5",
  ];

  const handleNotifications = () => {
    router.push("/notifications");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="">
          <Bell className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {isAuthed ? (
          <>
            {notifications.map((notification, i) => (
              <DropdownMenuItem key={i}>{notification}</DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleNotifications}>
              See all notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 p-4">
            <p className="text-center font-semibold ">
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
