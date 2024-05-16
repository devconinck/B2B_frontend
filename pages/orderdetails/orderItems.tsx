import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/router";
import { OrderItem } from "@/types";

import { OrderTable } from "../orders/ordertable";
import { getOrderItems } from "../api/orderItem";
import { useQuery } from "@tanstack/react-query";
import { LoaderOrderitems } from "@/components/LoaderOrderitems";
import Error from "@/components/Error";
import { Order } from "@/types";

const OrderItems = () => {
  const router = useRouter();
  const { orderId, currency } = router.query;

  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderItems"],
    queryFn: () => getOrderItems(orderId),
  });

  if (isLoading) {
    return <LoaderOrderitems />;
  }
  if (error) {
    <Error error={error} />;
  }
  if (!orderItems) {
    return <p>No orderitems available</p>;
  }

  const useOrderDetailsColumns = (currency: any) => {
    const columns: ColumnDef<OrderItem>[] = [
      {
        accessorKey: "inStock",
        header: ({ column }) => {
          return (
            <div
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
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
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <p className="mr-2">Quantity</p>
              <ArrowUpDown className="h-4 w-4" />
            </div>
          );
        },
      },
      {
        accessorFn: (row) =>
          `${(row.total || 0) * (row.quantity || 0)} ${currency}`,
        id: "total",
        header: ({ column }) => {
          return (
            <div
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <p className="mr-2">Total Productprice</p>
              <ArrowUpDown className="h-4 w-4" />
            </div>
          );
        },
      },
      {
        accessorFn: (row) => `${row.unitPrice} ${currency}`,
        id: "unitPrice",
        header: ({ column }) => {
          return (
            <div
              className="flex items-center"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              <p className="mr-2">Unit Price</p>
              <ArrowUpDown className="h-4 w-4" />
            </div>
          );
        },
      },
    ];
    return columns;
  };

  const columns = useOrderDetailsColumns(currency);
  return (
    <div className="container mx-auto py-0">
      <h2 className="text-2xl font-bold tracking-tight mt-10 mb-3 flex items-center justify-center">
        Overview of all the orderitems from the order
      </h2>
      <OrderTable
        columns={columns}
        data={orderItems}
        sortingValue={"name"}
        decSorting={false}
        datePicker={false}
      />
    </div>
  );
};

export default OrderItems;
