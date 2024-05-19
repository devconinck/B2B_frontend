import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import { CustomCheckbox, CustomTextInput } from "../customInputs";
import { Button } from "@/components/ui/button";
import { Pencil, Check } from "lucide-react";
import { useState } from "react";

/*
Van een bedrijf als leverancier wordt volgende info getoond op zijn profiel TODO
•	Logo
•	Naam (uniek)
•	Sector
•	Adres
•	Betalingsmogelijkheden en -info
•	Contactgegevens
•	BTW nummer 
•	Gegevens van de leveranciersaccount
*/

const items = [
  { id: 1, name: "Stripe", value: "STRIPE" },
  { id: 2, name: "Bitcoin", value: "BITCOIN" },
  { id: 3, name: "Credit Card", value: "CREDIT_CARD" },
  { id: 4, name: "Debitcard", value: "DEBIT_CARD" },
  { id: 5, name: "Bank Transfer", value: "BANK_TRANSFER" },
  { id: 6, name: "Paypal", value: "PAYPAL" },
];

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
  )
}