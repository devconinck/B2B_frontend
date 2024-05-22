import { axios } from "./index";
import { Company, Product } from "@/types";

const baseUrl = `/api/company`;

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
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

export const postProfileUpdateRequest = async (data: any) => {
  try {
    await axios.post(`${baseUrl}/update`, data);
  } catch (error) {
    throw error;
  }
};
