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
    accessorKey: "customername",
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
    accessorKey: "orderid",
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
    accessorKey: "orderstatus",
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
    accessorKey: "paymentstatus",
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
  customername: string;
  orderid: string;
  orderstatus: string;
  paymentstatus: string;
}

const mockOrders: Order[] = [
  {
    date: "2024-04-01",
    customername: "John Doe",
    orderid: "ORD1234",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-02",
    customername: "Alice Johnson",
    orderid: "ORD5678",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-03",
    customername: "Bob Smith",
    orderid: "ORD9012",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-04",
    customername: "Emily Brown",
    orderid: "ORD3456",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-05",
    customername: "Sophia Martinez",
    orderid: "ORD7890",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-06",
    customername: "Michael Wilson",
    orderid: "ORD2345",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-07",
    customername: "Emma Lee",
    orderid: "ORD6789",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-08",
    customername: "Daniel Garcia",
    orderid: "ORD0123",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-09",
    customername: "Olivia Lopez",
    orderid: "ORD4567",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-10",
    customername: "Liam Moore",
    orderid: "ORD8901",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-11",
    customername: "Ava Hernandez",
    orderid: "ORD2345",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-12",
    customername: "Noah Clark",
    orderid: "ORD6789",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-13",
    customername: "Isabella Lewis",
    orderid: "ORD0123",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-14",
    customername: "James Young",
    orderid: "ORD4567",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-15",
    customername: "Mia Rodriguez",
    orderid: "ORD8901",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-16",
    customername: "William Scott",
    orderid: "ORD2345",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-17",
    customername: "Charlotte Hall",
    orderid: "ORD6789",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-18",
    customername: "Ethan Allen",
    orderid: "ORD0123",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-19",
    customername: "Harper King",
    orderid: "ORD4567",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-20",
    customername: "Amelia Hill",
    orderid: "ORD8901",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-12",
    customername: "Noah Clark",
    orderid: "ORD6789",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-13",
    customername: "Isabella Lewis",
    orderid: "ORD0123",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-06",
    customername: "Michael Wilson",
    orderid: "ORD2345",
    orderstatus: "Delivered",
    paymentstatus: "Paid",
  },
  {
    date: "2024-04-07",
    customername: "Emma Lee",
    orderid: "ORD6789",
    orderstatus: "Pending",
    paymentstatus: "Unpaid",
  },
  {
    date: "2024-04-02",
    customername: "Alice Johnson",
    orderid: "ORD5678",
    orderstatus: "Shipped",
    paymentstatus: "Paid",
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
      <div className="flex items-center justify-between space-y-2 mb-5">
        <h2 className="text-2xl font-bold tracking-tight">
          Here is an overview of all the orders to your company
        </h2>
      </div>
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
