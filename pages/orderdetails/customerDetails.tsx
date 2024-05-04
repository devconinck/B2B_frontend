import { useRouter } from "next/router";
import { useContext } from "react";
import CompaniesContext from "@/context/companiesContext";
import { Company } from "@/types";
import { Button } from "@/components/ui/button";
import { handleDownloadInvoice } from "./invoice";
import Image from "next/image";
import { Mail, Phone, Package, CreditCard } from "lucide-react";

export const CustomerDetails = () => {
  const router = useRouter();
  const { companyId, orderId } = router.query;
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(companyId));

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
              <h1 className="text-2xl md:text-3xl font-bold">
                {company?.name}
              </h1>
              <p className="mt-2">
                {company?.address.street}, {company?.address.city},{" "}
                {company?.address.zipcode}, {company?.address.country}
              </p>
              <p className="mt-2">{company?.vatNumber}</p>
            </div>
            <div className="text-center md:text-right space-y-3">
              <p>
                <a
                  href={`mailto:${company?.contact.email}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Mail className="" />
                  <span className=" ">{company?.contact.email}</span>
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company?.contact.phoneNumber}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Phone />
                  <span className="">{company?.contact.phoneNumber}</span>
                </a>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <Package />
                <span className="">Orderstatus</span>
              </p>
              <p className="flex items-center justify-center md:justify-start space-x-2">
                <CreditCard />
                <span className="">Paymentstatus</span>
              </p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default CustomerDetails;