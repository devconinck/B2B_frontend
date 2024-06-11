import { useState, useEffect } from "react";
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
import { Toaster } from "@/components/ui/toaster";
import { jwtDecode } from "jwt-decode";

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

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    //role: decoded?.role,
    //companyId: decoded?.companyId,
    page: 1,
    pageAmount: 20,
    startDate: undefined,
    endDate: undefined,
    companyName: "",
    minAmount: undefined,
    maxAmount: undefined,
    orderReference: "",
    orderStatus: undefined,
    paymentStatus: undefined,
  });

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "date",
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Date</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Customer Name</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "orderId",
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Order ID</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Orderstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.orderStatus;
        return <Status value={status} />;
      },
    },
    {
      accessorKey: "paymentStatus",
      header: ({ column }) => (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Paymentstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      ),
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        return <Status value={status} />;
      },
    },
  ];

  if (decoded?.role === "CUSTOMER") {
    columns.push({
      accessorKey: "Payment",
      cell: ({ row }) => {
        const status = row.original.paymentStatus;
        const orderId = row.getValue("orderId");
        return <Payment orderId={orderId} value={status} />;
      },
    });
  }

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", filters],
    queryFn: () => getAllOrdersFromCompany(filters),
  });

  useEffect(() => {
    if (filters.page > 1 && !orders?.length) {
      setFilters((prev) => ({ ...prev, page: prev.page - 1 }));
    }
  }, [orders, filters.page]);

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  if (isLoading) {
    return <LoaderOrders />;
  }
  if (error) {
    //@ts-ignore
    return <Error error={error} />;
  }
  if (!orders) {
    return <p>No orders available</p>;
  }

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between space-y-2 mb-5">
          <h2 className="text-2xl font-bold tracking-tight">
            Here is an overview of all{" "}
            {decoded?.role === "SUPPLIER"
              ? "the orders to your company"
              : "your orders"}
          </h2>
          <div>{/* Add filter inputs here */}</div>
        </div>
        <OrderTable
          columns={columns}
          data={orders}
          sortingValue={"date"}
          decSorting={true}
          datePicker={true}
        />
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn"
            onClick={() => handlePageChange(filters.page - 1)}
            disabled={filters.page === 1}
          >
            Previous
          </button>
          <span>Page {filters.page}</span>
          <button
            className="btn"
            onClick={() => handlePageChange(filters.page + 1)}
            disabled={orders.length < filters.pageAmount}
          >
            Next
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default OrderScreen;
