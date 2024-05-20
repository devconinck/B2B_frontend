import { Button } from "@/components/ui/button";
import { CompanyDetails } from "./cards/companyDetails";
import { PersonalDetails } from "./cards/personalDetails";
import { Formik, Form, ErrorMessage } from "formik";
import { ProfileValidation } from "./profile_InitValues_Validation";
import { InitialValues } from "./profile_InitValues_Validation";
import { Payment } from "./cards/payment";
import { postProfileUpdateRequest } from "../api/companies";
import { useToast } from "@/components/ui/use-toast";
import { ErrorDisplay } from "./errorDisplay";
import PrivateRoute from "@/components/PrivateRoute";
import { NextPage } from "next";
import { useAuth } from "@/context/authContext";
import { jwtDecode } from 'jwt-decode';

const ProfileScreen: NextPage = () => {
  return (
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  );
};

const Profile = () => {

  const { token }: any = useAuth();
  let decoded: any;
  if(token) {
    decoded = jwtDecode(token);
  }
  const { toast } = useToast();

  const handleSubmit = async (data: any) => {
    try {
      await postProfileUpdateRequest(data);
      toast({
        variant: "default",
        title: "Success!",
        description: "Update request has been received",
        duration: 5000,
        className: "bg-green-500 text-white",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `There was a problem with your request. Please try again later. ${error}`,
        duration: 5000,
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="items-center mx-auto max-w-6xl">
          <Formik             
            initialValues={InitialValues()}
            validationSchema={ProfileValidation}
            onSubmit={async (values: any) => {
              await handleSubmit(values);
            }}
          >
            {({ isSubmitting, isValid }: any) => (
              <Form className="flex flex-col gap-6">
                <ErrorDisplay />
                <CompanyDetails />
                { decoded?.role === "SUPPLIER" ? <Payment /> : null}
                <PersonalDetails />
                <Button type="submit" disabled={!isValid || isSubmitting} variant={"destructive"} className="w-full">
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  );
}


export default ProfileScreen;
