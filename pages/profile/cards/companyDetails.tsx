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
import Image from "next/image";
import { Address } from "./address";
import { Contact } from "./contact";

export const CompanyDetails: React.FC<EditableProfile>  = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">

          <div className="flex flex-row gap-6">
            <div className="">
              <div className="flex flex-row content-between items-end">
                <Image
                  src="/random.png"
                  width={150}
                  height={150}
                  className=""
                  alt="delaware logo"
                />
                <div className="w-full">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Company Name"
                  disabled={!isEditing}
                />
                </div>
              </div>

              <Label htmlFor="sector">Sector</Label>
              <Input id="sector" placeholder="Sector" disabled={!isEditing} />
            </div>

            {/*

            <Label htmlFor="vatNumber">VAT Number</Label>
            <Input
              id="vatNumber"
              placeholder="VAT Number"
              disabled={!isEditing}
            />
            */}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};