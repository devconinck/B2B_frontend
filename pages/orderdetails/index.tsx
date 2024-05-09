import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { OrderTable } from "../orders/ordertable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { Company } from "@/types";
import CustomerDetails from "./customerDetails";
import { getOrderItems } from "../api/orderItem";
import { getCompanyById } from "../api/companies";
import { OrderItem } from "@/types";
import { getOrderById } from "../api/orders";
import { Order } from "@/types";

import { handleDownloadInvoice } from "./invoice";

// Router
const useOrderDetailsRouter = () => {
  const router = useRouter();
  const { orderId, companyId } = router.query;

  const handleReturn = () => {
    router.push("/orders");
  };

  return { orderId, companyId, handleReturn };
};

// Queries
const useOrderDetailsQueries = (orderId: string | string[], companyId: string | string[]) => {
  const {
    data: company_data,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
  } = useQuery<Company>({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyById(companyId as string),
  });

  const {
    data: order_data,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
  });

  const {
    data: current_company_data,
    isLoading: isCurrentCompanyLoading,
    isError: isCurrentCompanyError,
  } = useQuery<Company>({
    queryKey: ["company", "current"],
    queryFn: () => getCompanyById("current"),
  });

  const {
    data: orderItems_data,
    isLoading: isOrderItemsLoading,
    isError: isOrderItemsError,
  } = useQuery<OrderItem[]>({
    queryKey: ["orderItems", orderId],
    queryFn: () => getOrderItems(orderId as string),
  });

  return {
    company_data,
    isCompanyLoading,
    isCompanyError,
    order_data,
    isOrderLoading,
    isOrderError,
    current_company_data,
    isCurrentCompanyLoading,
    isCurrentCompanyError,
    orderItems_data,
    isOrderItemsLoading,
    isOrderItemsError,
  };
};

// Columns
const useOrderDetailsColumns = (order_data: Order | undefined) => {
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
      accessorFn: (row) => `${(row.unitPrice || 0) * (row.quantity || 0)} ${order_data?.currency}`,
      id: 'totalProductPrice',
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
      accessorFn: (row) => `${row.unitPrice} ${order_data?.currency}`,
      id: 'unitPrice',
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

  return columns;
};

const OrderDetails: NextPage = () => {
  const { orderId, companyId, handleReturn } = useOrderDetailsRouter();
  const {
    company_data,
    isCompanyLoading,
    isCompanyError,
    order_data,
    isOrderLoading,
    isOrderError,
    current_company_data,
    isCurrentCompanyLoading,
    isCurrentCompanyError,
    orderItems_data,
    isOrderItemsLoading,
    isOrderItemsError,
  } = useOrderDetailsQueries(orderId as string, companyId as string);

  const columns = useOrderDetailsColumns(order_data);

  if (
    isCompanyLoading ||
    isOrderItemsLoading ||
    isCurrentCompanyLoading ||
    isOrderLoading
  ) {
    return <Loader />;
  }

  if (
    isCompanyError ||
    isOrderItemsError ||
    isCurrentCompanyError ||
    isOrderError
  ) {
    return <div>Error occurred while fetching data.</div>;
  }

  if (!company_data || !orderItems_data || !current_company_data || !order_data) {
    return <div>Data not available.</div>;
  }

  return (
    <div style={{ height: "90.75vh" }}>
      <ResizablePanelGroup
        direction="horizontal"
        className="flex max-w-full rounde-lg border h-full"
      >
        <ResizablePanel defaultSize={50}>
          <Button className="bg-[rgb(239,70,60)] m-4" onClick={handleReturn}>
            RETURN TO ORDERS
          </Button>
          <Button
            className="bg-[rgb(239,70,60)] m-4"
            onClick={() =>
              handleDownloadInvoice(
                company_data,
                current_company_data,
                orderItems_data,
                order_data,
                orderId as string
              )
            }
          >
            DOWNLOAD INVOICE
          </Button>
          <h2 className="text-2xl font-bold tracking-tight mt-4 ml-5 mb-6">
            Overview of the customer details
          </h2>
          <CustomerDetails />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <h2 className="text-2xl font-bold tracking-tight mt-20 ml-5 mb-6 flex items-center justify-center">
            Overview of all the orderitems from the order
          </h2>
          <div className="flex h-full items-start justify-center">
            <OrderTable
              columns={columns}
              data={orderItems_data}
              sortingValue={"name"}
              decSorting={false}
              datePicker={false}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default OrderDetails;