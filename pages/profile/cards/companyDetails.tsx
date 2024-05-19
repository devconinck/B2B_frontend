import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import Image from "next/image";
import { CustomTextInput, CustomSelect } from "../customInputs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil, Check, Contact, Home, Phone, Mail } from "lucide-react";

const sectors = [
  { id: 1, value: "Agriculture", name: "Agriculture" },
  { id: 2, value: "Automotive", name: "Automotive" },
  { id: 3, value: "Banking", name: "Banking" },
  { id: 4, value: "Construction", name: "Construction" },
  { id: 5, value: "Education", name: "Education" },
  { id: 6, value: "Energy", name: "Energy" },
  { id: 7, value: "Fashion", name: "Fashion" },
  { id: 8, value: "Food_and_beverage", name: "Food & Beverage" },
  { id: 9, value: "Healthcare", name: "Healthcare" },
  { id: 10, value: "Hospitality", name: "Hospitality" },
  { id: 11, value: "Information_technology", name: "Information Technology" },
  { id: 12, value: "Manufacturing", name: "Manufacturing" },
  { id: 13, value: "Media_and_entertainment", name: "Media & Entertainment" },
  { id: 14, value: "Real_estate", name: "Real Estate" },
  { id: 15, value: "Trade", name: "Trade" },
  { id: 16, value: "Telecommunications", name: "Telecommunications" },
  { id: 17, value: "Transport", name: "Transport" },
  { id: 18, value: "Utilities", name: "Utilities" },
  { id: 19, value: "Technology", name: "Technology" },
  { id: 20, value: "Other", name: "Other" },
  { id: 21, value: "Finance", name: "Finance" },
  { id: 22, value: "Retail", name: "Retail" },
  { id: 23, value: "Marketing", name: "Marketing" },
  { id: 24, value: "Logistics", name: "Logistics" },
  { id: 25, value: "Engineering", name: "Engineering" }
];

export const CompanyDetails: React.FC<any>  = () => {

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between w-full p-4 pb-0">
          <CardTitle className="flex-grow">Company Details</CardTitle>
          <Button type="button" variant={"outline"} size={"icon"} onClick={handleEdit}>
            {isEditing ? <Check /> : <Pencil />}
          </Button>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="flex items-center w-full">
            <Image
              src="/random.png"
              width={150}
              height={150}
              className="rounded-full m-4"
              alt="delaware logo"
            />
            <div className="w-full">
              <CustomTextInput name="companyName" label="Company Name" disabled={!isEditing}/>
              <CustomSelect name="sector" label="Sector" options={sectors} disabled={!isEditing}/>
            </div>
          </div>
          
          <hr className="my-2 border-gray-300" />
          
          <div>
            <div className="flex flex-row space-x-2 pb-3">
              <Contact />
              <h2 className="font-semibold">Contact</h2>
            </div>
            <div className="flex space-x-4 pb-4">
              <div className="flex flex-row space-x-2 items-center w-full">
                <Phone />
                <CustomTextInput name="phone" disabled={!isEditing} classname={"flex-grow"}/>
              </div>
              <div className="flex flex-row space-x-2 items-center w-full">
                <Mail />
                <CustomTextInput name="email" disabled={!isEditing} classname={"flex-grow"}/>
              </div>
            </div>
          </div>

          <hr className="my-2 border-gray-300" />

          <div>
            <div className="flex flex-row space-x-2">
              <Home />
              <h2 className="font-semibold">Address</h2>
            </div>
            <div className="flex flex-row gap-6">
              <CustomTextInput name="country" label="Country" disabled={!isEditing} />
              <CustomTextInput name="city" label="City" disabled={!isEditing} />
              <CustomTextInput name="postal" label="Postal Code" disabled={!isEditing} />
            </div>
            <div className="flex flex-row gap-6">
              <div className="w-full">
                <CustomTextInput name="street" label="Street" disabled={!isEditing} />
              </div>
              <div className="w-44">
                <CustomTextInput name="number" label="House Number" disabled={!isEditing} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};