import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "qrcode";
import { useState } from "react";
import { updateOrder } from "../api/orders";

type PaymentProps = {
  value: string;
};

export function Payment({ value }: PaymentProps) {
  const [src, setSrc] = useState<String>("");
  //const [scanned, setScanned] = useState(false);

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(`Click here to pay`, {
        width: 350,
        height: 350,
      });
      setSrc(response);
      handleScanning();
    } catch (error) {
      throw error;
    }
  };

  const handleScanning = () => {
    console.log("test");
    //const answer = updateOrder(, "PAID")
  };
  return value === "INVOICE_SENT" ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-black text-white"
          onClick={generateQrCode}
          variant="outline"
        >
          Pay
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <img src={src} />
      </DialogContent>
    </Dialog>
  ) : null;
}
