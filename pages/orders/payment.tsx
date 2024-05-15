import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

type PaymentProps = {
  value: string;
};

export function Payment({ value }: PaymentProps) {
  const [src, setSrc] = useState<String>("");
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(`Click here to pay`, { width: 350, height: 350 }).then(
      (dataUrl) => {
        setSrc(dataUrl);
        handleScanning();
      }
    );
  }, []);

  const handleScanning = () => {
    setScanned(true);
    //alert("You have successfully paid!");
  };
  return value === "UNPROCESSED" ? (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Pay</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <img src={src} />
      </DialogContent>
    </Dialog>
  ) : null;
}
