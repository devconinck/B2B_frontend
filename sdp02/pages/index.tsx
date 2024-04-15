import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextPage } from "next";
const Home: NextPage = () => {
  return (
    <div className="space-y-10 pb-10">
      <div className="overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <div className=" max-w-xs rounded-lg p-8 font-bold sm:max-w-xl">
            <Button size="lg" className="w-full p-12 text-3xl">
              <Link href="/order">Order Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
