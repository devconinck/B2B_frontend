import { NextPage } from "next";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const labelFields = [
  "Customer Name",
  "Customer Email",
  "Order ID",
  "Street",
  "Address Nr.",
  "City",
  "Postalcode",
  "Country",
  "Orderstatus",
  "Paymentstatus",
  "Last Payment Update",
];

const OrderDetails: NextPage = () => {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-full rounde-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <h2 className="text-2xl font-bold tracking-tight mt-4 ml-5 mb-6">
          Overview of the customer details
        </h2>
        <div className="grid grid-cols-2 gap-4 mx-5 mb-5">
          {labelFields.map((label, index) => {
            return (
              <div
                key={index}
                className="grid w-full max-w-sm items-center gap-1.5"
              >
                <Label>{label}</Label>
                <Input
                  type="text"
                  id={label.toLowerCase().trim()}
                  disabled={true}
                  placeholder={label}
                />
              </div>
            );
          })}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6"></div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default OrderDetails;
