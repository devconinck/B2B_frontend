import { useState } from "react";
import Image from "next/image";
import { ShoppingBag, BellRing } from "lucide-react";
import { OrderScreen } from "./orderscreen/OrderScreen";
import { NotificationScreen } from "./notificationscreen/NotificationScreen";
import { Button } from "@/components/ui/button";

export const SupplierScreen = () => {
  const [isNotificationsClicked, setIsNotificationsClicked] = useState(false);
  const clickedNotifications = () => {
    setIsOrdersClicked(false);
    setIsNotificationsClicked(true);
  };

  const [isOrdersClicked, setIsOrdersClicked] = useState(false);
  const clickedOrders = () => {
    setIsNotificationsClicked(false);
    setIsOrdersClicked(true);
  };

  const logOut = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-400 w-1/6 p-4 flex flex-col justify-between">
        <div className="mt-4 mb-4 flex justify-center">
          <Image
            src="/logo/Delaware-logo.jpg"
            alt="Logo delaware"
            width={140}
            height={70}
          />
        </div>
        <div className="flex justify-center">
          <ul>
            <li className="mb-2">
              <Button onClick={clickedNotifications}>
                <BellRing className="mr-2 h-4 w-4" />
                Customers
              </Button>
            </li>
            <li className="mb-2">
              <Button onClick={clickedOrders}>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Orders
              </Button>
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
          <Button className="bg-red-500" onClick={logOut}>
            Log Out
          </Button>
        </div>
      </div>

      {/* Screens */}
      <div className="flex flex-col w-5/6 p-4">
        <div className="flex justify-between mt-6 mb-2">
          <span>
            {isOrdersClicked
              ? "Orders"
              : isNotificationsClicked
              ? "Notifications"
              : "Welcome"}
          </span>
          <span>Company</span>
        </div>
        <div className="border-b-2 border-red-500 mb-4"></div>
        <div>
          {isOrdersClicked ? (
            <OrderScreen />
          ) : isNotificationsClicked ? (
            <NotificationScreen />
          ) : null}
        </div>
      </div>
    </div>
  );
};
