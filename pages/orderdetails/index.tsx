import { NextPage } from "next";

import CustomerDetails from "./customerDetails";
import OrderItems from "./orderItems";

const OrderDetails: NextPage = () => {
  return (
    <div>
      <CustomerDetails />
      <OrderItems />
    </div>
  );
};

export default OrderDetails;
