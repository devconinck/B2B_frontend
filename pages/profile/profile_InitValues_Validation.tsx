import { useContext } from "react";
import * as Yup from "yup";
import { Company } from "@/types";
import CompaniesContext from "@/context/companiesContext";
import { jwtDecode } from 'jwt-decode';
import { useAuth } from "@/context/authContext";

export const ProfileValidation = Yup.object().shape({
  companyName: Yup.string()
    .min(2, "Too short!")
    .max(50, "Too long!")
    .required("The company name is required"),
  sector: Yup.string()
    .notOneOf(["Sector"], "Please select a valid sector")
    .required("The sector is required"),
  phone: Yup.string()
    .min(9, "Must be at least 9 digits")
    .max(10, "Must be less then 11 digits")
    .required("The phone number is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("The email is required"),
  country: Yup.string().required("The country is required"),
  city: Yup.string().required("The city is required"),
  postal: Yup.string().required("The postal code is required"),
  street: Yup.string().required("The address street is required"),
  number: Yup.string().required("The address number is required"),
  useremail: Yup.string().email("Invalid user email").required("The user email is required"),
  customersince: Yup.date().required("The customer since date is required"),
  vatnumber: Yup.string().required("The vatnumber is required"),
  paymentOptions: Yup.array().min(1, "At least one option is required").required("At least one option is required"),
});


export const InitialValues = () => {
  const { token }: any = useAuth();
  let company: Company | undefined;
  let userEmail: string | undefined;
  const companies: Company[] = useContext(CompaniesContext);
  if (token) {
    const decode: any = jwtDecode(token ? token : "d.d.d");
    userEmail = decode.email;
    company = companies.find(comp => comp.id === decode?.companyId);
  }

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

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
    useremail: userEmail ?? "",
    customersince: formatDate(company?.customerStart),
    vatnumber: company?.vatNumber ?? "",
    oldvatnumber: company?.vatNumber ?? "",
    bankaccountnr: company?.bankAccountNr ?? "",
    paymentOptions: company?.paymentOptions ?? [],
  };
};
