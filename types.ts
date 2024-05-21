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
  customerStart: Date;
  sector: string;
  paymentOptions: string[];
};

export type User = {
  id: number;
  email: string;
  role: Role;
  companyId: number;
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
  price: number;
  PRODUCTAVAILABILITY?: string | null;
  PRODUCTCATEGORYID?: string | null;
  productId?: string | null;
  productUnitOfMeasureId?: string | null;
  syncId?: number | null;
};

export type OrderItem = {
  ID: bigint;
  inStock: string | null;
  name: string | null;
  ORDERID: number | null;
  ORDERITEMID: number | null;
  quantity: number | null;
  SYNCID: number | null;
  total: number | null;
  UNITOFMEASUREID: string | null;
  unitPrice: number | null;
  FROMORDER_ID: bigint | null;
  PRODUCT_ID: bigint | null;
  order_table: OrderTable | null;
  product: Product | null;
};

export type Role = "admin" | "user";

export interface EditableProfile {
  isEditing: boolean;
}
export type Order = {
  date: string;
  name: string | null;
  orderId: string | null;
  orderStatus: string;
  paymentStatus: string;
  fromCompanyId: string;
};

export enum OrderStatus {
  PLACED = "Placed",
  PROCESSED = "Processed",
  SHIPPED = "Shipped",
  OUT_FOR_DELIVERY = "Out for Delivery",
  DELIVERED = "Delivered",
  COMPLETED = "Completed",
}

export enum PaymentStatus {
  UNPROCESSED = "Unprocessed",
  INVOICE_SENT = "Invoice Sent",
  PAID = "Paid",
}

export type Notification = {
  id: string,
  notificationType: NotificationType;
  date: string;
  text: string;
  orderId: string;
  notificationStatus: NotificationStatus;
};

export enum NotificationType {
  PAYMENT_REQUEST = "Payment Request", // Only for the customer
  PAYMENT_RECEIVED = "Payment Received", // Only for the supplier
  ORDER_READY = "Order Ready" // Only for the supplier
}

export enum NotificationStatus {
  READ = "Read",
  UNREAD = "Unread",
  NEW = "New"
}
