import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Company, EditableProfile } from "@/types";
import { useRouter } from "next/router";
import CompaniesContext from "@/context/companiesContext";
import { getAllProductsForCompany } from "@/pages/api/companies";
import { useQuery } from "@tanstack/react-query";

const fields = [
  {label: "Country", id: "country", placeholder: ""},
  {label: "City", id: "city", placeholder: ""},
  {label: "Postal Code", id: "postal", placeholder: ""},
]

export const Address: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {

  const companyId = "1";
  const companies = useContext(CompaniesContext) as Company[];

  const company = companies.find((company) => company.id === Number(companyId));

  fields.forEach((field) => {
    switch (field.id) {
      case "country":
        field.placeholder = company?.address.country ?? "";
        break;
      case "city":
        field.placeholder = company?.address.city ?? "";
        break;
      case "postal":
        field.placeholder = company?.address.zipcode ?? "";
        break;
      default:
        break;
    }
  });

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row gap-6">
            {fields.map((field, index) => (
              <div key={index} className="flex-grow">
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  disabled={!isEditing}
                />
              </div>
            ))}
          </div>
          <div className="flex flex-row gap-6">
            <div className="w-full">
              <Label htmlFor="street">Street</Label>
              <Input id="street" placeholder={company?.address.street} disabled={!isEditing} />
            </div>
            <div className="w-44">
              <Label htmlFor="number">House Number</Label>
              <Input
                id="number"
                placeholder={company?.address.number}
                disabled={!isEditing}
              />
            </div>
          </div>
          
        </CardContent>
      </Card>
    </div>
  )
}