import { NextPage } from "next";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
import { OrderTable } from "./ordertable";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

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

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Date</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Customer Name</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "orderId",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Order ID</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Orderstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <p className="mr-2">Paymentstatus</p>
          <ArrowUpDown className="h-4 w-4" />
        </div>
      );
    },
  },
  /*{
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 border-black" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },*/
];

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
    date: "2024-04-02",
    customerName: "Alice Johnson",
    orderId: "ORD5678",
    orderStatus: "Shipped",
    paymentStatus: "Paid",
  },
];

const OrderScreen: NextPage = () => {
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
    <div className="container mx-auto py-10">
      <OrderTable columns={columns} data={mockOrders} />
      {/*<Form {...form}>
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
            </Table>*/}
    </div>
  );
};

export default OrderScreen;
