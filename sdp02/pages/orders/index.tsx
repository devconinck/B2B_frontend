import { NextPage } from "next";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { OrderTable } from "./ordertable";

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Date</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "customername",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Customer Name</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "orderid",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Order ID</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "orderstatus",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Orderstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "paymentstatus",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Paymentstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  /*{
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 border-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },*/
];

interface Order {
  date: string;
  customername: string;
  orderid: string;
  orderstatus: string;
  paymentstatus: string;
}

const mockOrders: Order[] = [
  {
    date: "2024-04-01",
    customername: "John Doe",
    orderid: "ORD1234",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-02",
    customername: "Alice Johnson",
    orderid: "ORD5678",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-03",
    customername: "Bob Smith",
    orderid: "ORD9012",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-04",
    customername: "Emily Brown",
    orderid: "ORD3456",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-05",
    customername: "Sophia Martinez",
    orderid: "ORD7890",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-06",
    customername: "Michael Wilson",
    orderid: "ORD2345",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-07",
    customername: "Emma Lee",
    orderid: "ORD6789",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-08",
    customername: "Daniel Garcia",
    orderid: "ORD0123",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-09",
    customername: "Olivia Lopez",
    orderid: "ORD4567",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-10",
    customername: "Liam Moore",
    orderid: "ORD8901",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-11",
    customername: "Ava Hernandez",
    orderid: "ORD2345",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-12",
    customername: "Noah Clark",
    orderid: "ORD6789",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-13",
    customername: "Isabella Lewis",
    orderid: "ORD0123",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-14",
    customername: "James Young",
    orderid: "ORD4567",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-15",
    customername: "Mia Rodriguez",
    orderid: "ORD8901",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-16",
    customername: "William Scott",
    orderid: "ORD2345",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-17",
    customername: "Charlotte Hall",
    orderid: "ORD6789",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-18",
    customername: "Ethan Allen",
    orderid: "ORD0123",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-19",
    customername: "Harper King",
    orderid: "ORD4567",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-20",
    customername: "Amelia Hill",
    orderid: "ORD8901",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-12",
    customername: "Noah Clark",
    orderid: "ORD6789",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-13",
    customername: "Isabella Lewis",
    orderid: "ORD0123",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-06",
    customername: "Michael Wilson",
    orderid: "ORD2345",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-07",
    customername: "Emma Lee",
    orderid: "ORD6789",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-02",
    customername: "Alice Johnson",
    orderid: "ORD5678",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
];

const OrderScreen: NextPage = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-y-2 mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Here is an overview of all the orders to your company
        </h2>
      </div>
      <OrderTable columns={columns} data={mockOrders} />
      {/*
      <Table className="border mt-4">
        <TableCaption>A list of orderitems</TableCaption>
        <TableHeader>
          <TableRow className="bg-red-500">
            <TableHead>In Stock</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Productprice</TableHead>
            <TableHead>Unit Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>STOCK</TableCell>
            <TableCell>ITEM</TableCell>
            <TableCell>10</TableCell>
            <TableCell>€150.00</TableCell>
            <TableCell>€15.00</TableCell>
          </TableRow>
        </TableBody>
            </Table>*/}
    </div>
  );
};

export default OrderScreen;
