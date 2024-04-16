import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const OrderScreen = () => {
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
