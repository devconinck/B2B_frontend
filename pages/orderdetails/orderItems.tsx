import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useRouter } from "next/router";
import { Company, Order, OrderItem } from "@/types";
import { OrderTable } from "../orders/ordertable";
import { getOrderItems } from "../api/orderItem";
import { useQuery } from "@tanstack/react-query";
import { LoaderOrderitems } from "@/components/LoaderOrderitems";
import Error from "@/components/Error";
import { getOrderById } from "../api/orders";
import { Button } from "@/components/ui/button";
import { handleDownloadInvoice } from "./invoice";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { AuthContextValue, useAuth } from "@/context/authContext";

const OrderItems = () => {
  const router = useRouter();
  const { orderId, currency } = router.query;

  const companies = useContext(CompaniesContext) as Company[];
  const { user } = useAuth() as AuthContextValue;
  const {
    data: info,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["info"],
    queryFn: () => getOrderById(orderId),
  });
  const currentCompany = companies.find(
    (company) => company.id === user?.companyId
  );
  const company = companies.find(
    (company) => company.id === Number(info?.fromCompanyId)
  );

  const {
    data: order,
    isLoading: isOrderLoading,
    error: OrderError,
  } = useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
  });

  const {
    data: orderItems,
    isLoading: isOrderItemLoading,
    error: OrderItemError,
  } = useQuery({
    queryKey: ["orderItems"],
    queryFn: () => getOrderItems(orderId),
  });

  if (isOrderItemLoading || isOrderLoading) {
    return <LoaderOrderitems />;
  }

  if (OrderItemError || OrderError) {
    return <Error error={OrderItemError || OrderError} />;
  }

  if (!orderItems) {
    return <p>No orderitems available</p>;
  }
  if (!order) {
    return <p>No order available</p>;
  }
  if (!company) {
    return <p>No personal information available</p>;
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
      <Button
        className="bg-[rgb(239,70,60)] ml-4 mt-2"
        onClick={() =>
          handleDownloadInvoice(
            company,
            currentCompany,
            orderItems,
            order,
            orderId
          )
        }
      >
        DOWNLOAD INVOICE
      </Button>
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
