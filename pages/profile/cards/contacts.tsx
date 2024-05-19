import React from "react";
import { EditableProfile } from "@/types";
import { CustomTextInput } from "../customInputs";
import { Contact, Phone, Mail } from "lucide-react";

export const Contacts: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
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
  )
}