import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import { CustomCheckboxenInput, CustomTextInput } from "../customInputs";

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
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const

export const Address: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTextInput name="vatnumber" label="VAT Number" disabled={!isEditing}/>
          <CustomTextInput name="paymentoptions" label="Payment Options" disabled={!isEditing}/>
          <CustomCheckboxenInput name="paymentoptions" label="Payment Options" disabled={!isEditing} options={items}/>
        </CardContent>
      </Card>
    </div>
  )
}