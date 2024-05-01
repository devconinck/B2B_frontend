import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EditableProfile } from "@/types";

export const Address: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="bank">Bank Account</Label>
          <Input
            id="bank"
            placeholder="Bank Account"
            disabled={!isEditing}
          />
          <Label htmlFor="payments">Payment Options</Label>
          <Input
            id="payments"
            placeholder="Payment options"
            disabled={!isEditing}
          />
        </CardContent>
      </Card>
    </div>
  )
}