export type Company = {
  id: number;
  name: string;
  logo: string;
  isActive: boolean;
  vatNumber: string;
  address: {
    country: string;
    city: string;
    zipcode: string;
    street: string;
    number: string;
  };
  bankAccountNr: number;
  contact: {
    email: string;
    phoneNumber: string;
  };
  customerStart: string;
  sector: string;
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
