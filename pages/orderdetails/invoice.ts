import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template-nodejs";
import { OrderItem, Company } from "@/types";

export const handleDownloadInvoice = (company: Company, orderItems: OrderItem[], orderId: string) => {
  const pdfObject = jsPDFInvoiceTemplate({
    outputType: "save",
    returnJsPDFDocObject: true,
    fileName: "Invoice",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
      type: "PNG",
      width: 53.33,
      height: 26.66,
      margin: { top: 0, left: 0 },
    },
    business: {
      name: company.name || "", // Provide a default value if company.name is undefined
      address: company.address || "", // Provide a default value if company.address is undefined
      phone: company.contact?.phoneNumber || "/", // Provide a default value if company.contact.phoneNumber is undefined
      email: company.contact?.email || "/", // Provide a default value if company.contact.email is undefined
    },
    contact: {
      label: "Invoice issued for:",
      name: "Client Name",
      address: "Client Address",
      phone: "Client Phone",
      email: "Client Email",
    },
    invoice: {
      label: "Invoice #: ",
      num: orderId,
      invDate: "Payment Date: 01/01/2021 18:12",
      invGenDate: "Invoice Date: 02/02/2021 10:17",
      header: [
        { title: "#", style: { width: 10 } },
        { title: "Title", style: { width: 30 } },
        { title: "Description", style: { width: 80 } },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: orderItems.map((item, index) => [
        index + 1,
        item.product?.name || item.NAME || "", // Provide a default value if item.product.name and item.name are undefined
        item.product?.description || "", // Provide a default value if item.product.description is undefined
        item.UNITPRICE || 0, // Provide a default value if item.unitPrice is undefined
        item.QUANTITY || 0, // Provide a default value if item.quantity is undefined
        item.UNITOFMEASUREID || "", // Provide a default value if item.unitOfMeasureId is undefined
        (item.UNITPRICE || 0) * (item.QUANTITY || 0), // Provide a default value if item.unitPrice or item.quantity is undefined
      ]),
      additionalRows: [
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