import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditableProfile } from "@/types";

export const PersonalDetails: React.FC<EditableProfile>  = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">

          <div className="max-w-40">
            <Label htmlFor="customerSince">Customer since</Label>
            <Input id="constomerSince" placeholder="02/09/2021" disabled={!isEditing} />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Email" disabled={!isEditing} />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" placeholder="password" disabled={!isEditing} />
          </div>

        </CardContent>
      </Card>
    </div>
  );
};