import jsPDFInvoiceTemplate, { OutputType } from "jspdf-invoice-template-nodejs";
import { OrderItem, Company } from "@/types";

export const handleDownloadInvoice = (company: Company, orderItems: OrderItem[], orderId: string) => {
  if (!company || !orderItems) {
    return;
  }

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
      margin: {
        top: 0,
        left: 0,
      },
    },
    business: {
      name: company.name,
      address: company.address,
      phone: company.contact?.phoneNumber || "/",
      email: company.contact?.email || "/",
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
        {
          title: "#",
          style: { width: 10 },
        },
        {
          title: "Title",
          style: { width: 30 },
        },
        {
          title: "Description",
          style: { width: 80 },
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: orderItems.map((item, index) => [
        index + 1,
        item.product?.name ?? item.NAME,
        item.product?.description,
        item.UNITPRICE,
        item.QUANTITY,
        item.UNITOFMEASUREID,
        (item.UNITPRICE ?? 0) * (item.QUANTITY ?? 0),
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: orderItems.reduce(
            (total, item) => total + (item.UNITPRICE ?? 0) * (item.QUANTITY ?? 0),
            0
          ),
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