import { useState } from "react";
import OrderScreen from "../orders/index";
import NotificationScreen from "../notifications/index";

import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

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

  return (
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
  );
};
