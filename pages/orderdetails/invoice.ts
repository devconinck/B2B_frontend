import jsPDFInvoiceTemplate from "jspdf-invoice-template-nodejs";
import { OrderItem, Company, Order } from "@/types";

export const handleDownloadInvoice = (
  company: Company,
  current_company: Company,
  orderItems: OrderItem[],
  order: Order,
  orderId: String
) => {
  const pdfObject = jsPDFInvoiceTemplate({
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: `Invoice ${orderId}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "https://i.ibb.co/yqJb3Fz/Delaware-3531928973.jpg",
      type: "PNG",
      width: 53.33,
      height: 26.66,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: current_company.name,
      address: `${current_company.address.street} ${current_company.address.number}, ${current_company.address.city}, ${current_company.address.zipcode}, ${current_company.address.country}`,
      phone: `+${current_company.contact.phoneNumber}`,
      email: current_company.contact.email,
    },
    contact: {
      label: "Invoice issued for:",
      name: company.name,
      address: `${company.address.street} ${company.address.number}, ${company.address.city}, ${company.address.zipcode}, ${company.address.country}`,
      phone: company.contact.phoneNumber,
      email: company.contact.email,
    },
    invoice: {
      label: "Invoice #: ",
      num: orderId,
      paymentStatus: `Payment Status: ${order.paymentStatus}`,
      orderStatus: `Order Status: ${order.orderStatus}`,
      invDate: `Order Date: ${new Date(order.orderDate).toLocaleDateString()}`, // Added orderDate
      invGenDate: `Invoice Date: ${new Date().toLocaleDateString()}`,
      header: [
        { title: "#", style: { width: 10 } },
        { title: "Item", style: { width: 30 } },
        { title: "Description", style: { width: 80 } },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: orderItems.map((item, index) => [
        index + 1,
        item.product?.name || item.name || "",
        item.product?.description || "",
        `${item.unitPrice || 0} ${order.currency}`,
        item.quantity || 0,
        item.unitOfMeasureId || "",
        `${(item.unitPrice || 0) * (item.quantity || 0)} ${order.currency}`,
      ]),
      additionalRows: [
        {
          col1: `VAT Number: ${current_company.vatNumber}`,
          col2: `BANK: ${current_company.bankAccountNr}`,
          style: { fontSize: 9 },
        },
        {
          col1: `Sector: ${current_company.sector}`,
          col2: `Customer Since: ${new Date(
            current_company.customerStart
          ).toLocaleDateString()}`,
          style: { fontSize: 9 },
        },
        {
          col1: "Total:",
          col2:
            orderItems.reduce(
              (total, item) =>
                total + (item.unitPrice || 0) * (item.quantity || 0),
              0
            ) +
            " " +
            order.currency,
          col3: "ALL",
          style: { fontSize: 14 },
        },
      ],
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  });
};
