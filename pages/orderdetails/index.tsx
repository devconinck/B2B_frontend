import { NextPage } from "next";

import CustomerDetails from "./customerDetails";
import OrderItems from "./orderItems";
import PrivateRoute from "@/components/PrivateRoute";

const OrderDetails: NextPage = () => {
  return (
    <PrivateRoute>
      <div>
        <CustomerDetails />
        <OrderItems />
      </div>
    </PrivateRoute>
  );
};

export default OrderDetails;
