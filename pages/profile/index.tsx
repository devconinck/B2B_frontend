import Link from "next/link";
import { CircleUser, Menu, Package2, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Profile</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6">
          <form className="grid gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Company Details</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Company Name"
                  disabled={!isEditing}
                />

                <Label htmlFor="sector">Sector</Label>
                <Input id="sector" placeholder="Sector" disabled={!isEditing} />

                <Label htmlFor="vatNumber">VAT Number</Label>
                <Input
                  id="vatNumber"
                  placeholder="VAT Number"
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Address</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="street">Street</Label>
                <Input id="street" placeholder="Street" disabled={!isEditing} />
                <Label htmlFor="number">House Number</Label>
                <Input
                  id="number"
                  placeholder="House Number"
                  disabled={!isEditing}
                />
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="City" disabled={!isEditing} />
                <Label htmlFor="postal">Postal Code</Label>
                <Input
                  id="postal"
                  placeholder="Postal Code"
                  disabled={!isEditing}
                />
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Country"
                  disabled={!isEditing}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Contact</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Phone" disabled={!isEditing} />
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Email" disabled={!isEditing} />
              </CardContent>
            </Card>
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
          </form>
          <Button variant={"destructive"} className="" onClick={handleEdit}>
            {isEditing ? "Save" : "Edit"}
          </Button>
        </div>
      </main>
    </div>
  );
}
