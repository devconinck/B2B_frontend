import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "qrcode";
import { useState } from "react";
import { updateOrder } from "../api/orders";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

type PaymentProps = {
  orderId: any;
  value: string;
};

export const Payment = ({ orderId, value }: PaymentProps) => {
  const [src, setSrc] = useState<String>("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const generateQrCode = async () => {
    try {
      const response = await QRCode.toDataURL(`Click here to pay`, {
        width: 350,
        height: 350,
      });
      setSrc(response);
      if (process.env.NODE_ENV === "production") handlePaying();
    } catch (error) {
      throw error;
    }
  };

  const handlePaying = async () => {
    await updateOrder(orderId, { paymentStatus: 2 });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
    toast({
      description: `The order ${orderId} has been paid successfully.`,
    });
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
        {process.env.NODE_ENV === "development" && (
          <div className="flex justify-center items-center">
            <Button
              className="w-1/4 bg-black text-white"
              onClick={() => {
                handlePaying();
              }}
            >
              Pay here
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  ) : null;
};
