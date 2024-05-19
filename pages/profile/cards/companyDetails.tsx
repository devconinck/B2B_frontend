import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { CustomTextInput, CustomSelect } from "../customInputs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Pencil, Check } from "lucide-react";
import { Address } from "./address";
import { Contacts } from "./contacts";
import { sectors } from "./arrays";

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
          
          <Contacts isEditing={isEditing}/>

          <hr className="my-2 border-gray-300" />

          <Address isEditing={isEditing}/>

        </CardContent>
      </Card>
    </div>
  );
};