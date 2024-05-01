import { NextPage } from "next";
import { useRouter } from "next/router";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import { OrderTable } from "./ordertable";
import { getAllOrdersFromCompany } from "../api/orders";
import Loader from "@/components/Loader";
import Error from "@/components/Error";

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
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrdersFromCompany,
  });

  const filteredOrders = orders?.filter((order) => {
    console.log(order.orderStatus);
    return (
      order.orderStatus === "Placed" ||
      order.orderStatus === "Processed" ||
      (order.orderStatus === "Delivered" && order.paymentStatus === "Unpaid")
    );
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <Error error={error} />;
  }
  if (!orders) {
    return <p>No orders available</p>;
  }
  //console.log(orders.map((order) => ))
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
      />
    </div>
  );
};

export default OrderScreen;
