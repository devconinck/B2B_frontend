import { axios } from "./index";
import Error, { ErrorProps } from "next/error";
import { Company, Product } from "@/types";
import { setAuthToken } from "./index";
import token_temp from "@/TOKEN";

const baseUrl = `/api/company`;

export const getCompanyById = async (companyId: string): Promise<Company> => {
  try {
    setAuthToken(
      token_temp
    );
    console.log("TETSET")
    const test = await axios.get(`${baseUrl}/${companyId}`).then((res) => res.data.items[0])
    console.log("TEST" + test)
    return test;
  } catch (error) {
    throw error;
  }
}

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    setAuthToken(
      token_temp
    );
    return await axios.get(baseUrl).then((res) => res.data.items);
  } catch (error) {
    throw error;
  }
};

export const getAllProductsForCompany = async (
  companyId: String
): Promise<Product[]> => {
  try {
    return await axios
      .get(`${baseUrl}/${companyId}/products`)
      .then((res) => res.data.items);
  } catch (error) {
    throw error;
  }
};
