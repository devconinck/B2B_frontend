import { useContext } from "react";
import * as Yup from "yup";
import { Company } from "@/types";
import CompaniesContext from "@/context/companiesContext";
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { useState, useEffect } from "react";
import { getCompanyById } from "../api/companies";
import { JsonWebKey } from "crypto";

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
  vatnumber: Yup.string().required("Required"),
  paymentOptions: Yup.array().min(1, "At least one option is required").required("Required"),
});


// TODO juiste data van ingelogd bedrijf en user
export const InitialValues = () => {
  const [company, setCompany] = useState<Company | null>(null);
  const companies: Company[] = useContext(CompaniesContext);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No JWT token found');
        }

        const decodedToken: any = jwtDecode(token);
        if (!decodedToken || !decodedToken.companyId) {
          throw new Error('Invalid token or companyId not found in token');
        }

        const companyId = decodedToken.companyId;
        const userCompany = null //companies.find((company: Company) => company.id === companyId);

        if (userCompany) {
          setCompany(userCompany);
        } else {
          const fetchedCompany = await getCompanyById(companyId);
          setCompany(fetchedCompany);
        }
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    fetchCompany();
  }, [companies]);

  console.log(company?.sector);

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
    customersince: company?.customerStart,
    vatnumber: company?.vatNumber ?? "",
    paymentOptions: company?.paymentOptions ?? [],
  };
};
