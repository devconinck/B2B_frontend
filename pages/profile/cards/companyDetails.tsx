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
  { id: 1, value: "Agriculture", name: "Agriculture" },
  { id: 2, value: "Automotive", name: "Automotive" },
  { id: 3, value: "Banking", name: "Banking" },
  { id: 4, value: "Construction", name: "Construction" },
  { id: 5, value: "Education", name: "Education" },
  { id: 6, value: "Energy", name: "Energy" },
  { id: 7, value: "Fashion", name: "Fashion" },
  { id: 8, value: "Food_and_beverage", name: "Food & Beverage" },
  { id: 9, value: "Healthcare", name: "Healthcare" },
  { id: 10, value: "Hospitality", name: "Hospitality" },
  { id: 11, value: "Information_technology", name: "Information Technology" },
  { id: 12, value: "Manufacturing", name: "Manufacturing" },
  { id: 13, value: "Media_and_entertainment", name: "Media & Entertainment" },
  { id: 14, value: "Real_estate", name: "Real Estate" },
  { id: 15, value: "Trade", name: "Trade" },
  { id: 16, value: "Telecommunications", name: "Telecommunications" },
  { id: 17, value: "Transport", name: "Transport" },
  { id: 18, value: "Utilities", name: "Utilities" },
  { id: 19, value: "Technology", name: "Technology" },
  { id: 20, value: "Other", name: "Other" },
  { id: 21, value: "Finance", name: "Finance" },
  { id: 22, value: "Retail", name: "Retail" },
  { id: 23, value: "Marketing", name: "Marketing" },
  { id: 24, value: "Logistics", name: "Logistics" },
  { id: 25, value: "Engineering", name: "Engineering" }
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

          <CustomSelect name="sector" label="Sector" options={sectors} disabled={!isEditing}/>

        </CardContent>
      </Card>
    </div>
  );
};