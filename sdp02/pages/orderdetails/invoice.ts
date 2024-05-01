import { jsPDF } from 'jspdf';
import jsPDFInvoiceTemplate from "jspdf-invoice-template";


export const handleDownloadInvoice = () => {
    const doc = new jsPDF();
  
    doc.text("Hello world!", 10, 10);
  
    // Save the PDF
    doc.save('invoice.pdf');
  };