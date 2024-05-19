import React from "react";
import { EditableProfile } from "@/types";
import { CustomTextInput } from "../customInputs";
import { Home } from "lucide-react";

export const Address: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {

  return (
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
  )
}