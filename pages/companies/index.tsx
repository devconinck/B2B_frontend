import { NextPage } from "next";
import React from "react";

const CompaniesPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Companies Page</h1>
      <p className="text-lg text-gray-600">
        You can find our companies by using the search function in the header.
      </p>
    </div>
  );
};

export default CompaniesPage;
