import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditableProfile } from "@/types";
import Image from "next/image";
import { CustomTextInput, CustomSelect } from "../customInputs";


const sectors = [
  { id: 1, value: "agriculture", name: "Agriculture" },
  { id: 2, value: "automotive", name: "Automotive" },
  { id: 3, value: "banking", name: "Banking" },
  { id: 4, value: "construction", name: "Construction" },
  { id: 5, value: "education", name: "Education" },
  { id: 6, value: "energy", name: "Energy" },
  { id: 7, value: "fashion", name: "Fashion" },
  { id: 8, value: "food_and_beverage", name: "Food & Beverage" },
  { id: 9, value: "healthcare", name: "Healthcare" },
  { id: 10, value: "hospitality", name: "Hospitality" },
  { id: 11, value: "information_technology", name: "Information Technology" },
  { id: 12, value: "manufacturing", name: "Manufacturing" },
  { id: 13, value: "media_and_entertainment", name: "Media & Entertainment" },
  { id: 14, value: "real_estate", name: "Real Estate" },
  { id: 15, value: "retail", name: "Retail" },
  { id: 16, value: "telecommunications", name: "Telecommunications" },
  { id: 17, value: "transportation_and_logistics", name: "Transportation & Logistics" },
  { id: 18, value: "utilities", name: "Utilities" },
  { id: 19, value: "other", name: "Other" }
];




export const CompanyDetails: React.FC<EditableProfile>  = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-row content-between items-end">
            <Image
              src="/random.png"
              width={150}
              height={150}
              className=""
              alt="delaware logo"
            />
            <CustomTextInput name="companyName" label="Company Name" disabled={!isEditing}/>
          </div>

          <CustomSelect name="sector" label="Sector" placeholder="Select a sector" options={sectors} disabled={!isEditing}/>

            {/*

            <Label htmlFor="vatNumber">VAT Number</Label>
            <Input
              id="vatNumber"
              placeholder="VAT Number"
              disabled={!isEditing}
            />
            */}

        </CardContent>
      </Card>
    </div>
  );
};