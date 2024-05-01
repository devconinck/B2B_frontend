import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CompanyDetails } from "./cards/companyDetails";
import { PersonalDetails } from "./cards/personalDetails";
import { Contact } from "./cards/contact";
import { Address } from "./cards/address";

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

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto flex flex-col w-full max-w-6xl gap-6">
          <form className="flex flex-col gap-6">

            <div className="flex flex-row justify-center gap-6">
              <CompanyDetails isEditing={isEditing}/>
              <Address isEditing={isEditing}/>
            </div>
            <div className="flex flex-row justify-center gap-6">
              <div className="w-1/3">
                <Contact isEditing={isEditing}/>
              </div>
              <div className="w-1/2">
                <PersonalDetails isEditing={isEditing}/>
              </div>
            </div>
          </form>
          <Button variant={"destructive"} className="" onClick={handleEdit}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </main>
    </div>
  );
}
