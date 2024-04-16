import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  customername: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  customeremail: z.string().min(2, {
    message: "",
  }),
  orderid: z.string().min(2, {
    message: "",
  }),
  street: z.string().min(2, {
    message: "",
  }),
  addressnr: z.string().min(2, {
    message: "",
  }),
  city: z.string().min(2, {
    message: "",
  }),
  postalcode: z.string().min(2, {
    message: "",
  }),
  country: z.string().min(2, {
    message: "",
  }),
  lastpaymentupdate: z.string().min(2, {
    message: "",
  }),
  orderstatus: z.string().min(2, {
    message: "",
  }),
  paymentstatus: z.string().min(2, {
    message: "",
  }),
});

export const OrderScreen = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customername: "Customer Name",
      customeremail: "Customer Email",
      orderid: "Order ID",
      street: "Street",
      addressnr: "Address Nr",
      city: "City",
      postalcode: "Postal Code",
      country: "Country",
      lastpaymentupdate: "Last Update",
      orderstatus: "Order Status",
      paymentstatus: "Payment Status",
    },
  });

  //Later nodig om tabellen te kunnen aanpassen bij aanpassing van statussen
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div>
      <Table className="border mt-4">
        <TableCaption>A list of orders to the company</TableCaption>
        <TableHeader>
          <TableRow className="bg-red-500 border-b-2 border-black">
            <TableHead>Date</TableHead>
            <TableHead>Name Customer</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Orderstatus</TableHead>
            <TableHead>Betaalstatus</TableHead>
          </TableRow>
        </TableHeader>
        {/*Data uit de backend halen*/}
        <TableBody>
          <TableRow>
            <TableCell>2024-04-10</TableCell>
            <TableCell>Tester</TableCell>
            <TableCell>1234</TableCell>
            <TableCell>PROCESSED</TableCell>
            <TableCell>PAID</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="customername"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="customeremail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Customer Email</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Order ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street</FormLabel>
                  <FormControl>
                    <Input placeholder="Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressnr"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Nr.</FormLabel>
                  <FormControl>
                    <Input placeholder="Address Nr." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PostalCode</FormLabel>
                  <FormControl>
                    <Input placeholder="PostalCode" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder="Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastpaymentupdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Payment Update</FormLabel>
                  <FormControl>
                    <Input placeholder="Reminder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderstatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OrderStatus</FormLabel>
                  <FormControl>
                    <Input placeholder="OrderStatus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="paymentstatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PaymentStatus</FormLabel>
                  <FormControl>
                    <Input placeholder="PaymentStatus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button className="mt-4 bg-red-500 text-dark">Submit</Button>
            </div>
          </div>
        </form>
      </Form>
      <Table className="border mt-4">
        <TableCaption>A list of orderitems</TableCaption>
        <TableHeader>
          <TableRow className="bg-red-500">
            <TableHead>In Stock</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Total Productprice</TableHead>
            <TableHead>Unit Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>STOCK</TableCell>
            <TableCell>ITEM</TableCell>
            <TableCell>10</TableCell>
            <TableCell>€150.00</TableCell>
            <TableCell>€15.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
