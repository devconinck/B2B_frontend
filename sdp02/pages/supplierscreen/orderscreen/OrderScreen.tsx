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

interface Order {
  date: string;
  customerName: string;
  orderId: string;
  orderStatus: string;
  paymentStatus: string;
}

const mockOrders: Order[] = [
  {
    date: "2024-04-01",
    customerName: "John Doe",
    orderId: "ORD1234",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-02",
    customerName: "Alice Johnson",
    orderId: "ORD5678",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-03",
    customerName: "Bob Smith",
    orderId: "ORD9012",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-04",
    customerName: "Emily Brown",
    orderId: "ORD3456",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-05",
    customerName: "Sophia Martinez",
    orderId: "ORD7890",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-06",
    customerName: "Michael Wilson",
    orderId: "ORD2345",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-07",
    customerName: "Emma Lee",
    orderId: "ORD6789",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-08",
    customerName: "Daniel Garcia",
    orderId: "ORD0123",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-09",
    customerName: "Olivia Lopez",
    orderId: "ORD4567",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-10",
    customerName: "Liam Moore",
    orderId: "ORD8901",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-11",
    customerName: "Ava Hernandez",
    orderId: "ORD2345",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-12",
    customerName: "Noah Clark",
    orderId: "ORD6789",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-13",
    customerName: "Isabella Lewis",
    orderId: "ORD0123",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-14",
    customerName: "James Young",
    orderId: "ORD4567",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-15",
    customerName: "Mia Rodriguez",
    orderId: "ORD8901",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-16",
    customerName: "William Scott",
    orderId: "ORD2345",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-17",
    customerName: "Charlotte Hall",
    orderId: "ORD6789",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-18",
    customerName: "Ethan Allen",
    orderId: "ORD0123",
    orderStatus: "Delivered",
    paymentStatus: "Paid",
  },
  {
    date: "2024-04-19",
    customerName: "Harper King",
    orderId: "ORD4567",
    orderStatus: "Pending",
    paymentStatus: "Unpaid",
  },
  {
    date: "2024-04-20",
    customerName: "Amelia Hill",
    orderId: "ORD8901",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
];

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
      <p>Test</p>
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
          {mockOrders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.orderStatus}</TableCell>
              <TableCell>{order.paymentStatus}</TableCell>
            </TableRow>
          ))}
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
