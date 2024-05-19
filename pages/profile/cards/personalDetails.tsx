import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import { CustomTextInput } from "../customInputs";
import { Mail, CalendarDays, Check, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const PersonalDetails: React.FC<any>  = () => {

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  }

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between w-full p-4 pb-0">
          <CardTitle className="flex-grow">Personal Details</CardTitle>
          <Button type="button" variant={"outline"} size={"icon"} onClick={handleEdit}>
            {isEditing ? <Check /> : <Pencil />}
          </Button>
        </CardHeader>
        <CardContent className="flex flex-row gap-6 pt-2">

          <div className="flex flex-row space-x-2 items-center w-full">
            <Mail />
            <CustomTextInput name="useremail" classname={"w-full"} disabled={!isEditing}/>
          </div>
          <div className="flex flex-row space-x-2 items-center w-3/6">
            <CalendarDays />
            <CustomTextInput name="customersince" disabled={true}/>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};