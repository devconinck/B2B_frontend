import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
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
import { useRouter } from "next/router";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { Company } from "@/types";
import CustomerDetails from "./customerDetails";
import { useQuery } from "@tanstack/react-query";
import { getOrderItems } from "../api/orderItem";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import { OrderItem } from "@/types";

const columns: ColumnDef<OrderItem>[] = [
  {
    accessorKey: "inStock",
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
  },
  {
    accessorKey: "total",
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
    accessorKey: "unitPrice",
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
  ];

const OrderDetails: NextPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const companyId = "1";
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(companyId));

  const {
    data: orderItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orderItems"],
    queryFn: () => getOrderItems(orderId),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    <Error error={error} />;
  }
  if (!orderItems) {
    <p>No orderitems available</p>;
  }
  console.log(orderItems?.length);
  return (
    <div>
      <CustomerDetails />
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
    </div>
  );
};

export default OrderDetails;