import { useContext } from "react";
import * as Yup from "yup";
import { Company } from "@/types";
import CompaniesContext from "@/context/companiesContext";

export const ProfileValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("Required"),
  sector: Yup.string()
    .notOneOf(["Sector"], "Please select a valid sector")
    .required("Required"),
  phone: Yup.string()
    // TODO some validation?
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  country: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  postal: Yup.string().required("Required"),
  street: Yup.string().required("Required"),
  number: Yup.string().required("Required"),
  useremail: Yup.string().email("Invalid user email").required("Required"),
  customersince: Yup.date().required("Required"),
});


// TODO juiste data van ingelogd bedrijf en user
export const InitialValues = () => {
  const companies = useContext(CompaniesContext) as Company[];
  const company = companies.find((company) => company.id === Number(1));

  return {
    companyName: company?.name ?? "",
    sector: company?.sector ?? "",
    phone: company?.contact.phoneNumber ?? "",
    email: company?.contact.email ?? "",
    country: company?.address.country ?? "",
    city: company?.address.city ?? "",
    postal: company?.address.zipcode ?? "",
    street: company?.address.street ?? "",
    number: company?.address.number ?? "",
    useremail: "Goatifi@gmail.com",
    customersince: new Date().toDateString(),
  }
}
