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

export const Contact: React.FC<EditableProfile> = ({isEditing}: EditableProfile) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" placeholder="0476795261" disabled={!isEditing} />
          <Label htmlFor="email">Email</Label>
          <Input id="email" placeholder="Charles.leclerc@icloud.com" disabled={!isEditing} />
        </CardContent>
      </Card>
    </div>
  )
}