export type Company = {
  id: number;
  bankAccountNr?: number;
  customerStart?: Date;
  isActive?: boolean;
  logo?: string;
  name?: string;
  sector?: string;
  vatNumber?: string;
  city?: string;
  country?: string;
  number?: string;
  street?: string;
  zipCode?: string;
  email?: string;
  phoneNumber?: string;
  account: Account[];
  companyKnownCompaniesCompanyKnownCompaniesCompanyIdToCompany: CompanyKnownCompanies[];
  companyKnownCompaniesCompanyKnownCompaniesKnownCompanyIdToCompany: CompanyKnownCompanies[];
  companyPaymentOptions: CompanyPaymentOptions[];
  orderTableOrderTableFromCompanyIdToCompany: OrderTable[];
  orderTableOrderTableToCompanyIdToCompany: OrderTable[];
  product: Product[];
};
export type Account = {
  id: number;
  balance: number;
  companyId: number;
};
export type CompanyKnownCompanies = {
  companyId: number;
  knownCompanyId: number;
};
export type CompanyPaymentOptions = {
  companyId: number;
  paymentOptionId: number;
};
export type OrderTable = {
  companyId: number;
  id: number;
  orderDate: Date;
  orderStatus: string;
  orderTableProduct: Product[];
};

export type Product = {
  id: Number;
  name: String;
  description: String;
  price: Number;
  companyId: Number;
};
export type Role = "admin" | "user";
