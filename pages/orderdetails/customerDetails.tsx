import { useRouter } from "next/router";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { Company } from "@/types";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";

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
];

export const CustomerDetails = () => {
  const router = useRouter();
  const { rowData } = router.query;
  console.log(rowData);
  const companyId = "1";
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(companyId));

  const data = [
    company?.name,
    company?.contact?.email,
    47381,
    company?.address?.street,
    company?.address?.number,
    company?.address?.city,
    company?.address?.zipcode,
    company?.address?.country,
    "SHIPPED",
    "INVOICE_SENT",
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mx-5 mb-5">
      {labelFields.map((label, index) => {
        return (
          <div
            key={index}
            className="grid w-full max-w-sm items-center gap-1.5"
          >
            <Label>{label}</Label>
            <Input
              type="text"
              id={label}
              disabled={true}
              placeholder={label}
              value={data[index]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CustomerDetails;
