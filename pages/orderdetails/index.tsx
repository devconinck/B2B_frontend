import { NextPage } from "next";
import { useQuery, isReady } from "@tanstack/react-query";
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

const OrderDetails: NextPage = () => {
  const router = useRouter();
  const { orderId, companyId } = router.query;


  // TODO: GEBRUIK DE CONTEXT
  const { data: company_data, isLoading: isCompanyLoading, isError: isCompanyError } = useQuery<Company>({
    queryKey: ["company", companyId],
    queryFn: () => getCompanyById(companyId as string),
  });

  const { data: orderItems_data, isLoading: isOrderItemsLoading, isError: isOrderItemsError } = useQuery<OrderItem[]>({
    queryKey: ["orderItems", orderId],
    queryFn: () => getOrderItems(orderId as string),
  });

  if (isCompanyLoading || isOrderItemsLoading) {
    return <Loader />;
  }

  if (isCompanyError || isOrderItemsError) {
    return <div>Error occurred while fetching data.</div>;
  }

  if (!company_data || !orderItems_data) {
    return <div>No data available.</div>;
  }

  const handleReturn = () => {
    router.push("/orders");
  };

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
            onClick={ () => handleDownloadInvoice(company_data, orderItems_data, orderId as string)}
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
