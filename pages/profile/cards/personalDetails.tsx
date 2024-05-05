import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import { CustomTextInput } from "../customInputs";

export const PersonalDetails: React.FC<EditableProfile>  = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row gap-6">

          <div className="w-2/3">
            <CustomTextInput name="useremail" label="User Email" disabled={!isEditing}/>
          </div>
          <CustomTextInput name="customersince" label="Customer Since" disabled={!isEditing}/>

        </CardContent>
      </Card>
    </div>
  );
};