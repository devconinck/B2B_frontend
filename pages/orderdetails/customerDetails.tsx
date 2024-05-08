import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { getOrder } from "../api/orders";
import { Company } from "@/types";
import { Button } from "@/components/ui/button";
import { handleDownloadInvoice } from "./invoice";
import Image from "next/image";
import { Mail, Phone, Package, CreditCard } from "lucide-react";
import { LoaderPersonaldetails } from "@/components/LoaderPersonaldetails";
import Error from "@/components/Error";

export const CustomerDetails = () => {
  let name, fromCompanyId, fromCompany, orderStatus, paymentStatus;
  const router = useRouter();
  const { companyId, orderId } = router.query;
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(companyId));

  const {
    data: info,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["info"],
    queryFn: () => getOrder(orderId),
  });

  if (isLoading) {
    return (
      <div>
        <LoaderPersonaldetails />
      </div>
    );
  }
  if (error) {
    <Error error={error} />;
  }
  if (!info) {
    console.log("test");
    return <p>No personal information available</p>;
  }

  if (info) {
    ({ name, fromCompanyId, orderStatus, paymentStatus } = info[0]);
    fromCompany = companies.find(
      (company) => company.id === Number(fromCompanyId)
    );
  }

  const handleReturn = () => {
    router.push("/orders");
  };

  console.log(data)

  return (
    <div className="flex flex-col min-h-[25dvh]">
      <header className="bg-gray-100 dark:bg-slate-600">
        <Button
          className="bg-[rgb(239,70,60)] ml-4 mt-2"
          onClick={handleReturn}
        >
          RETURN TO ORDERS
        </Button>
        <Button
          className="bg-[rgb(239,70,60)] ml-4 mt-2"
          onClick={handleDownloadInvoice}
        >
          DOWNLOAD INVOICE
        </Button>
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
            <div className="flex justify-center md:justify-start">
              <div className="relative">
                <Image
                  src={"/random.png"}
                  alt={company.name}
                  width={200}
                  height={200}
                  className="w-32 h-32 object-cover rounded-full shadow-lg"
                  priority={true}
                />
                {/* Optional: You can add a background overlay for contrast */}
                <div className="absolute inset-0 bg-black opacity-25 rounded-full"></div>
              </div>
            </div>
            <div className="text-center  md:text-left">
              <h1 className="text-2xl md:text-3xl font-bold">{name}</h1>
              <p className="mt-2">
                {fromCompany?.address.street}, {fromCompany?.address.city},{" "}
                {fromCompany?.address.zipcode}, {fromCompany?.address.country}
              </p>
              <p className="mt-2">{fromCompany?.vatNumber}</p>
            </div>
            <div className="text-center md:text-right space-y-3">
              <p>
                <a
                  href={`mailto:${fromCompany?.contact.email}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Mail className="" />
                  <span className=" ">{fromCompany?.contact.email}</span>
                </a>
              </p>
              <p>
                <a
                  href={`tel:${fromCompany?.contact.phoneNumber}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Phone />
                  <span className="">{fromCompany?.contact.phoneNumber}</span>
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <Package />
                <span className="">{orderStatus}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <CreditCard />
                <span className="">{paymentStatus}</span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CustomerDetails;