import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "./api/companies";
const Home: NextPage = () => {
  return (
    <div className="space-y-10 pb-10">
      <div className="overflow-hidden rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-8 text-center">
          <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container px-4 md:px-6">
              <div className="grid max-w-[1300px] mx-auto items-center gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    B2B Platform
                  </div>
                  <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Welcome to the Future of Business
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    The all-in-one platform for delaware businesses. Connect
                    with customers, streamline operations, and supercharge
                    growth.
                  </p>
                </div>
                <Image
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full md:order-last"
                  height="310"
                  src="/welcome.jpg"
                  width="550"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
