import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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