import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import { useRouter } from "next/router";

const products = [
  {
    id: 1,
    name: "Executive Chair",
    description: "Comfortable and stylish chair for the office.",
    price: 199,
  },
  {
    id: 2,
    name: "Ergonomic Chair",
    description: "Designed for long hours of comfort and support.",
    price: 249,
  },
  {
    id: 3,
    name: "Conference Chair",
    description: "Sleek and modern chair for your meeting rooms.",
    price: 299,
  },
  {
    id: 4,
    name: "Lounge Chair",
    description: "Comfortable and stylish chair for your lobby.",
    price: 399,
  },
];
const CompanyPage: NextPage = () => {
  const router = useRouter();

  const companyId = router.query.id!!;

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <header className="bg-gray-100 dark:bg-slate-600 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl md:text-3xl font-bold">
                Company {companyId}
              </h1>
            </div>
            <p className="mt-4">address for company {companyId}</p>
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
                  className=" rounded-lg shadow-md overflow-hidden"
                >
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                    <p className=" mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        {product.price}
                      </span>
                      <Button size="sm" variant="outline">
                        Learn More
                      </Button>
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
