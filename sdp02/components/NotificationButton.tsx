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

export function NotificationButton() {
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
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

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
        {/*         <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-lg font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel> */}
        {notifications.map((notification, i) => (
          <DropdownMenuItem key={i}>{notification}</DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleNotifications}>
          See all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
