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
  { id: 1, name: "Stripe", value: "stripe" },
  { id: 2, name: "Bitcoin", value: "bitcoin" },
  { id: 3, name: "Credit Card", value: "creditcard" },
  { id: 4, name: "Debitcard", value: "debitcard" },
  { id: 5, name: "Bank Transfer", value: "banktransfer" },
  { id: 6, name: "Paypal", value: "paypal" },
];

export const Payment: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <CustomTextInput name="vatnumber" label="VAT Number" disabled={!isEditing}/>
          </div>
          <CustomCheckbox options={items} label="Payment Options" name="paymentOptions" disabled={!isEditing}/>
        </CardContent>
      </Card>
    </div>
  )
}