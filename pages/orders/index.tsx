import { NextPage } from "next";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import { OrderTable } from "./ordertable";
import { getAllOrdersFromCompany } from "../api/orders";
import { Order } from "@/types";
import { LoaderOrders } from "@/components/LoaderOrders";
import Error from "@/components/Error";
import Status from "@/components/Status";
import PrivateRoute from "@/components/PrivateRoute";

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
    accessorKey: "name",
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
    accessorKey: "orderId",
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
    accessorKey: "orderStatus",
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
    cell: ({ row }) => {
      const status = row.original.orderStatus;
      return <Status value={status} />;
    },
  },
  {
    accessorKey: "paymentStatus",
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
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return <Status value={status} />;
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

const OrderScreen: NextPage = () => {
  return (
    <PrivateRoute>
      <OrderContent />
    </PrivateRoute>
  );
};

const OrderContent = () => {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersFromCompany,
  });

  const filteredOrders = orders?.filter((order) => {
    return (
      order.orderStatus === "Placed" ||
      order.orderStatus === "Processed" ||
      (order.orderStatus === "Delivered" && order.paymentStatus === "Unpaid")
    );
  });

  if (isLoading) {
    return <LoaderOrders />;
  }
  if (error) {
    return <Error error={error} />;
  }
  if (!orders) {
    return <p>No orders available</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between space-y-2 mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Here is an overview of all the orders to your company
        </h2>
      </div>
      <OrderTable
        columns={columns}
        data={orders}
        sortingValue={"date"}
        decSorting={true}
        datePicker={true}
      />
    </div>
  );
};

export default OrderScreen;
