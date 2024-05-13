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

export const Contact: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomTextInput name="phone" label="Phone" disabled={!isEditing}/>
          <CustomTextInput name="email" label="Email" disabled={!isEditing}/>
        </CardContent>
      </Card>
    </div>
  )
}