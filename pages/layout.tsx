import React from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getAllCompanies } from "./api/companies";
import Loader from "@/components/Loader";
import Error from "@/components/Error";
import CompaniesContext from "@/context/companiesContext";
import ChatBot from "@/components/ChatBot";
import { Toaster } from "@/components/ui/toaster";
import NewNotifications from "./notifications/newNotifications";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const {
    data: companies,
    isLoading,
    error,
  } = useQuery({ queryKey: ["companies"], queryFn: getAllCompanies });

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    //@ts-ignore
    return <Error error={error} />;
  }

  if (!companies) {
    return <p>No products available</p>;
  }

  return (
    <>
      <CompaniesContext.Provider value={companies}>
        <Header />
        {children}
        <div className="absolute bottom-0 right-0 radius-50">
          <ChatBot></ChatBot>
        </div>
        <NewNotifications />
        <Toaster />
      </CompaniesContext.Provider>
    </>
  );
}
