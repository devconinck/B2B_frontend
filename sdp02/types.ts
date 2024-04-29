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
  FromCompanyId: number;
  id: number;
  description: string;
  name: string;
  PRODUCTAVAILABILITY?: string | null;
  PRODUCTCATEGORYID?: string | null;
  productId?: string | null;
  productUnitOfMeasureId?: string | null;
  syncId?: number | null;
};

export type OrderItem = {
  ID: bigint;
  INSTOCK?: string | null;
  NAME?: string | null;
  ORDERID?: number | null;
  ORDERITEMID?: number | null;
  QUANTITY?: number | null;
  SYNCID?: number | null;
  TOTAL?: number | null;
  UNITOFMEASUREID?: string | null;
  UNITPRICE?: number | null;
  FROMORDER_ID?: bigint | null;
  PRODUCT_ID?: bigint | null;
  order_table?: OrderTable | null;
  product?: Product | null;
};

export type Role = "admin" | "user";
