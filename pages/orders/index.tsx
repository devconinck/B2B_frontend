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
import { Payment } from "./payment";
import { useAuth } from "@/context/authContext";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "@/components/ui/toaster";

const OrderScreen: NextPage = () => {
  return (
    <PrivateRoute>
      <OrdersContent />
    </PrivateRoute>
  );
};
const OrdersContent: React.FC = () => {
  const { token }: any = useAuth();
  let decoded: any;
  if (token) {
    decoded = jwtDecode(token);
  }
  const columns: ColumnDef<Order>[] = [];
  columns.push(
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
    }
  );
  decoded?.role === "CUSTOMER"
    ? columns.push({
        accessorKey: "Payment",
        cell: ({ row }) => {
          const status = row.original.paymentStatus;
          const orderId = row.getValue("orderId");
          return <Payment orderId={orderId} value={status} />;
        },
      })
    : null;

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: ({ page, pageAmount }) =>
      getAllOrdersFromCompany(page, pageAmount),
  });

  /*const filteredOrders = orders?.filter((order) => {
    return (
      order.orderStatus === "Placed" ||
      order.orderStatus === "Processed" ||
      (order.orderStatus === "Delivered" && order.paymentStatus === "Unpaid")
    );
  });*/

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
    <PrivateRoute>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between space-y-2 mb-5">
          <h2 className="text-2xl font-bold tracking-tight">
            Here is an overview of all{" "}
            {decoded?.role === "SUPPLIER"
              ? "the orders to your company"
              : "your orders"}
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
      <Toaster />
    </PrivateRoute>
  );
};

export default OrderScreen;
