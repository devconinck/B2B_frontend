import React from "react";
import { OrderStatus, PaymentStatus } from "@/types";

type StatusProps = {
  value: string;
};

const STATUS_COLORS = {
  [OrderStatus.PLACED]: "bg-yellow-200 dark:text-gray-800",
  [OrderStatus.PROCESSED]: "bg-blue-200 dark:text-gray-800",
  [OrderStatus.SHIPPED]: "bg-green-200 dark:text-gray-800",
  [OrderStatus.OUT_FOR_DELIVERY]: "bg-indigo-200 dark:text-gray-800",
  [OrderStatus.DELIVERED]: "bg-purple-200 dark:text-gray-800",
  [OrderStatus.COMPLETED]: "bg-gray-200 dark:text-gray-800",
  [PaymentStatus.UNPROCESSED]: "bg-red-200 dark:text-gray-800",
  [PaymentStatus.INVOICE_SENT]: "bg-orange-200 dark:text-gray-800",
  [PaymentStatus.PAID]: "bg-green-200  dark:text-gray-800",
};

function isOrderStatus(value: string): value is OrderStatus {
  return Object.keys(OrderStatus).includes(value as OrderStatus);
}

function isPaymentStatus(value: string): value is PaymentStatus {
  return Object.keys(PaymentStatus).includes(value as PaymentStatus);
}

const Status: React.FC<StatusProps> = ({ value }) => {
  let enumValue: OrderStatus | PaymentStatus;
  let colorClass: string;

  if (isOrderStatus(value)) {
    enumValue = value as OrderStatus;
    colorClass = STATUS_COLORS[OrderStatus[enumValue]];
  } else if (isPaymentStatus(value)) {
    enumValue = value as PaymentStatus;
    colorClass = STATUS_COLORS[PaymentStatus[enumValue]];
  } else {
    // er liep iets mis
    return null;
  }

  return (
    <div className={`inline-block px-2 py-1 rounded ${colorClass}`}>
      {value}
    </div>
  );
};

export default Status;
