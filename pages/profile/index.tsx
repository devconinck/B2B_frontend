import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompanyDetails } from "./cards/companyDetails";
import { PersonalDetails } from "./cards/personalDetails";
import { Contact } from "./cards/contact";
import { Address } from "./cards/address";
import { Formik, Field, Form, ErrorMessage, FieldArray, useField } from 'formik';
import * as Yup from 'yup';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

/*
DR_DETAILS_PROFIEL
Van een bedrijf als klant wordt volgende info getoond op zijn profiel
•	Logo
•	Naam (uniek)
•	Sector
•	Adres
•	Contactgegevens
•	Klant sinds
•	Gegevens van de klantaccount
Van een bedrijf als leverancier wordt volgende info getoond op zijn profiel
•	Logo
•	Naam (uniek)
•	Sector
•	Adres
•	Betalingsmogelijkheden en -info
•	Contactgegevens
•	BTW nummer 
•	Gegevens van de leveranciersaccount
*/

export const CustomTextInput = ({ label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
        <Label htmlFor={props.id || props.name}>{label}</Label>
        <Input {...field} {...props} />
        {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage> // prop component toevoegen voor opmaak van errormessage https://formik.org/docs/api/errormessage
        ) : null}
    </div>
  );
};

export const CustomSelect = ({ label, placeholder, options, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <Label htmlFor={props.id || props.name}>{label}</Label>
      <Select {...props}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option: any) => (
            <SelectItem key={option.id} value={option.value}>{option.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {meta.touched && meta.error ? (
        <ErrorMessage name={props.name}></ErrorMessage>
      ) : null}
    </div>
  );
};

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  // TODO juiste data van ingelogde company?
  const initialValues = {
    companyName: "Company Name",
    sector: "Sector",
    phone: "+32476795263",
    email: "Charles.leclerc@icloud.com",
  }

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms)); // moet met de db spreken

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col w-full max-w-6xl gap-6">
          <Formik 
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              companyName: Yup.string().min(2, "Too short!").max(50, "Too long!").required("Required"),
              sector: Yup.string().required("Required"),
              phone: Yup.string().matches(/^\+[1-9]\d{1,14}$/, {
                message: "Invalid phone number",
                excludeEmptyString: true
              }),
              email: Yup.string().email("Invalid email").required("Required"),
            })}
            onSubmit={async (values) => {
              await sleep(350);
              alert(JSON.stringify(values, null, 2)) // values, replacer, spacer
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-6">

                <div className="flex flex-row justify-center gap-6 items-center">
                  <CompanyDetails isEditing={isEditing}/>
                  <div className="w-1/3">
                    <Contact isEditing={isEditing}/>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="max-w-xl">
                    <Address isEditing={isEditing}/>
                  </div>
                </div>
                <div className="flex flex-row justify-center gap-6">
                  <div className="w-1/2">
                    <PersonalDetails isEditing={isEditing}/>
                  </div>
                </div>
                <Button type={!isEditing ? "submit" : "button"} disabled={isSubmitting} variant={"destructive"} className="w-full" onClick={handleEdit}>
                  {isEditing ? "Save" : "Edit"}
                </Button>

              </Form>
            )}

          </Formik>
        </div>
      </main>
    </div>
  );
}

