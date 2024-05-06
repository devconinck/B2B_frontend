import jsPDFInvoiceTemplate from "jspdf-invoice-template-nodejs";
import { OrderItem, Company } from "@/types";

export const handleDownloadInvoice = (company: Company, current_company: Company, orderItems: OrderItem[], orderId: string) => {
  const pdfObject = jsPDFInvoiceTemplate({
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: `Invoice ${orderId}`,
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "https://i.ibb.co/yqJb3Fz/Delaware-3531928973.jpg", // TODO Placeholder
      type: "JPG",
      width: 53.33,
      height: 26.66,
      margin: {
        top: 0,
        left: 0
      },
    },
    business: {
      name: current_company.name,
      address: `${current_company.address.street} ${current_company.address.number}, ${current_company.address.city}, ${current_company.address.zipcode}, ${current_company.address.country}`,
      phone: current_company.contact.phoneNumber,
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
      invDate: "Payment Date: ", // You can provide the payment date here
      invGenDate: "Invoice Date: ", // You can provide the invoice date here
      header: [
        {
          title: "#",
          style: { width: 10 }
        },
        {
          title: "Item",
          style: { width: 30 }
        },
        {
          title: "Description",
          style: { width: 80 }
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      
      table: orderItems.map((item, index) => [
        index + 1,
        item.product?.name || item.NAME || "",
        item.product?.description || "",
        item.UNITPRICE || 0,
        item.QUANTITY || 0,
        item.UNITOFMEASUREID || "",
        (item.UNITPRICE || 0) * (item.QUANTITY || 0),
      ]),
      
      additionalRows: [
        {
          col1: "VAT Number:",
          col2: current_company.vatNumber,
          col3: "BANK:",
          col4: `${current_company.bankAccountNr}`,
          style: { fontSize: 9 },
        },
        {
          col1: "Sector:",
          col2: current_company.sector,
          col3: "Customer Since:",
          col4: new Date(current_company.customerStart).toLocaleDateString(),
          style: { fontSize: 9 },
        },
        {
          col1: "Total:",
          col2: orderItems.reduce((total, item) => total + (item.UNITPRICE || 0) * (item.QUANTITY || 0), 0),
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

  console.log("PDF created", pdfObject);
};