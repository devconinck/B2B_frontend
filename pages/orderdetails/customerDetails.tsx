import { useRouter } from "next/router";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { Company, Order } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import Status from "@/components/Status";
import { useQuery } from "@tanstack/react-query";
import { getOrderById } from "../api/orders";

const labelFields = [
  "Name",
  "Email",
  "Order ID",
  "Street",
  "Address Nr",
  "City",
  "Postalcode",
  "Country",
  "Orderstatus",
  "Paymentstatus",
  "VAT",
];

export const CustomerDetails = () => {
  const router = useRouter();
  const { companyId, orderId } = router.query;
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(companyId));

  const { data: order_data } = useQuery<Order>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId as string),
  });

  const data = [
    company?.name,
    company?.contact?.email,
    order_data?.id,
    company?.address?.street,
    company?.address?.number,
    company?.address?.city,
    company?.address?.zipcode,
    company?.address?.country,
    order_data?.orderStatus,
    order_data?.paymentStatus,
    company?.vatNumber,
  ];

  console.log(data)

  return (
    <div className="grid grid-cols-2 gap-4 mx-5 mb-5">
      {labelFields.map((label, index) => {
        if (label === "Orderstatus" || label === "Paymentstatus") {
          return (
            <div key={index} className="grid w-full max-w-sm items-center gap-1.5">
              <Label>{label}</Label>
              <Status value={data[index]} />
            </div>
          );
        }

        return (
          <div key={index} className="grid w-full max-w-sm items-center gap-1.5">
            <Label>{label}</Label>
            <Input type="text" id={label} disabled={true} placeholder={label} value={data[index]} />
          </div>
        );
      })}
    </div>
  );
};

export default CustomerDetails;