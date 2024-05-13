import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import { CustomTextInput } from "../customInputs";

export const Address: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Address</CardTitle>
        </CardHeader>
        <CardContent>

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
          
        </CardContent>
      </Card>
    </div>
  )
}