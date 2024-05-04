import { NextPage } from "next";

import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { OrderTable } from "../orders/ordertable";

import { handleDownloadInvoice } from "./invoice";

const labelFields = [
  "Customer Name",
  "Customer Email",
  "Order ID",
  "Street",
  "Address Nr",
  "City",
  "Postalcode",
  "Country",
  "Orderstatus",
  "Paymentstatus",
  "Last Payment Update",
];

interface Customer {
  customername: string;
  customeremail: string;
  orderid: string;
  street: string;
  addressnr: string;
  city: string;
  postalcode: string;
  country: string;
  orderstatus: string;
  paymentstatus: string;
  lastpaymentupdate: string;
}

const mockCustomers: Customer[] = [
  {
    customername: "John Doe",
    customeremail: "john@example.com",
    orderid: "ORD123456",
    street: "Main Street",
    addressnr: "123",
    city: "New York",
    postalcode: "10001",
    country: "USA",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
    lastpaymentupdate: "2024-04-12",
  },
  {
    customername: "Alice Smith",
    customeremail: "alice@example.com",
    orderid: "ORD789012",
    street: "Elm Street",
    addressnr: "456",
    city: "Los Angeles",
    postalcode: "90001",
    country: "USA",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
    lastpaymentupdate: "2024-04-13",
  },
];

interface OrderItem {
  instock: string;
  name: string;
  quantity: number;
  totalproductprice: number;
  unitprice: number;
}

const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "instock",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">In Stock</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Name</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Quantity</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "totalproductprice",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Total Productprice</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "unitprice",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Unit Price</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
];

const mockOrderItems: OrderItem[] = [
  {
    instock: "In Stock",
    name: "Product A",
    quantity: 10,
    totalproductprice: 150.99,
    unitprice: 15.99,
  },
  {
    instock: "Order",
    name: "Product B",
    quantity: 5,
    totalproductprice: 79.95,
    unitprice: 15.99,
  },
  {
    instock: "In Stock",
    name: "Product C",
    quantity: 8,
    totalproductprice: 99.92,
    unitprice: 12.49,
  },
  {
    instock: "In Stock",
    name: "Product D",
    quantity: 3,
    totalproductprice: 59.97,
    unitprice: 19.99,
  },
  {
    instock: "Order",
    name: "Product E",
    quantity: 7,
    totalproductprice: 111.93,
    unitprice: 15.99,
  },
  {
    instock: "In Stock",
    name: "Product F",
    quantity: 6,
    totalproductprice: 74.94,
    unitprice: 12.49,
  },
  {
    instock: "In Stock",
    name: "Product G",
    quantity: 2,
    totalproductprice: 39.98,
    unitprice: 19.99,
  },
  {
    instock: "Order",
    name: "Product H",
    quantity: 9,
    totalproductprice: 143.91,
    unitprice: 15.99,
  },
  {
    instock: "In Stock",
    name: "Product I",
    quantity: 4,
    totalproductprice: 49.96,
    unitprice: 12.49,
  },
  {
    instock: "In Stock",
    name: "Product J",
    quantity: 1,
    totalproductprice: 19.99,
    unitprice: 19.99,
  },
  {
    instock: "Order",
    name: "Product K",
    quantity: 3,
    totalproductprice: 59.97,
    unitprice: 19.99,
  },
  {
    instock: "In Stock",
    name: "Product L",
    quantity: 5,
    totalproductprice: 62.45,
    unitprice: 12.49,
  },
  {
    instock: "In Stock",
    name: "Product M",
    quantity: 2,
    totalproductprice: 39.98,
    unitprice: 19.99,
  },
  {
    instock: "Order",
    name: "Product N",
    quantity: 8,
    totalproductprice: 127.92,
    unitprice: 15.99,
  },
  {
    instock: "In Stock",
    name: "Product O",
    quantity: 6,
    totalproductprice: 74.94,
    unitprice: 12.49,
  },
  {
    instock: "In Stock",
    name: "Product P",
    quantity: 1,
    totalproductprice: 19.99,
    unitprice: 19.99,
  },
  {
    instock: "Order",
    name: "Product Q",
    quantity: 4,
    totalproductprice: 63.96,
    unitprice: 15.99,
  },
  {
    instock: "In Stock",
    name: "Product R",
    quantity: 3,
    totalproductprice: 59.97,
    unitprice: 19.99,
  },
];

const OrderDetails: NextPage = () => {
  return (
    <div style={{ height: "90.75vh" }}>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex max-w-full rounde-lg border h-full"
      >
        <ResizablePanel defaultSize={50}>
          <h2 className="text-2xl font-bold tracking-tight mt-4 ml-5 mb-6">
            Overview of the customer details
          </h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            // TODO vervangen door correcte orderID
            onClick={ () => handleDownloadInvoice(mockCustomers[0].orderid)}
          >
            Download Invoice
          </button>
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
                    id={label.toLowerCase().replaceAll(" ", "")}
                    disabled={true}
                    placeholder={label}
                    value={
                      mockCustomers[0][label.toLowerCase().replaceAll(" ", "")]
                    }
                  />
                </div>
              );
            })}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <h2 className="text-2xl font-bold tracking-tight mt-4 ml-5 mb-6 flex items-center justify-center">
            Overview of all the orderitems from the order
          </h2>
          <div className="flex h-full items-start justify-center">
            <OrderTable columns={columns} data={mockOrderItems} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default OrderDetails;