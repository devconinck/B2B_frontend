import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getAllProductsForCompany } from "../api/companies";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import CompaniesContext from "@/context/companiesContext";
import { Company } from "@/types";
import { useContext, useState } from "react";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";

const CompanyPage: NextPage = () => {
  const router = useRouter();

  const companyId = router.query.id!!;
  const companies = useContext(CompaniesContext) as Company[];

  const company = companies.find((company) => company.id === Number(companyId));

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleDescription = (index: any) => {
    setExpandedIndex(expandedIndex == index ? null : index);
  };

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", companyId],
    queryFn: () => getAllProductsForCompany(companyId[0]),
  });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    //@ts-ignore
    <Error error={error} />;
  }

  if (!products) {
    return <p>No products available</p>;
  }
  if (!company) {
    return <p>Company not found</p>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-100 dark:bg-slate-600 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
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
              <h1 className="text-2xl md:text-3xl font-bold">{company.name}</h1>
              <p className="mt-2">
                {company.address.street}, {company.address.city},{" "}
                {company.address.zipcode}, {company.address.country}
              </p>
            </div>
            <div className="text-center md:text-right space-y-3">
              <p>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Mail className="" />
                  <span className=" ">{company.contact.email}</span>
                </a>
              </p>
              <p>
                <a
                  href={`tel:${company.contact.phoneNumber}`}
                  className="flex items-center justify-center md:justify-start space-x-2 hover:text-red-500"
                >
                  <Phone />
                  <span className="">{company.contact.phoneNumber}</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Our Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">
                      {product.name ? product.name : product.productId}
                    </h3>
                    <p className={expandedIndex === index ? "mb-2" : "hidden"}>
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        Price: ${product.price}
                      </span>
                      <button
                        onClick={() => toggleDescription(index)}
                        className="text-blue-500"
                      >
                        {expandedIndex === index ? "Show Less" : "Learn More"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CompanyPage;
