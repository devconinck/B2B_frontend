import { useRouter } from "next/router";
import { Company, Order } from "@/types";
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
import { useOrderDetailsColumns } from "./columns";

const OrderItems = () => {
  const router = useRouter();
  const { orderId, currency }: any = router.query;

  const columns = useOrderDetailsColumns(currency);

  const companies = useContext(CompaniesContext) as Company[];
  const { user } = useAuth() as AuthContextValue;
  const { data: info } = useQuery({
    queryKey: ["info"],
    queryFn: () => getOrderById(orderId),
  });
  const currentCompany: any = companies.find(
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
    //@ts-ignore
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
