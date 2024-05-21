import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CustomCheckbox, CustomTextInput } from "../customInputs";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import { useState } from "react";
import { items } from "./arrays";

export const Payment: React.FC<any> = () => {

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between w-full p-4 pb-0">
          <CardTitle className="flex-grow">Payment</CardTitle>
          <Button type="button" variant={"outline"} size={"icon"} onClick={handleEdit}>
            {isEditing ? <Check /> : <Pencil />}
          </Button>
        </CardHeader>
        <CardContent className="px-4 pb-4 flex flex-col gap-6 sm:flex-row">
          <div className="w-full">
            <CustomTextInput name="bankaccountnr" label="Bank Account Number" disabled={!isEditing}/>
            <CustomTextInput name="vatnumber" label="VAT Number" disabled={!isEditing}/>
          </div>
          <CustomCheckbox options={items} label="Payment Options" name="paymentOptions" className="w-full sm:w-2/5" disabled={!isEditing}/>
        </CardContent>
      </Card>
    </div>
  );
};