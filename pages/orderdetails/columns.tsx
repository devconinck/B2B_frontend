import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { OrderItem } from "@/types";

export const useOrderDetailsColumns = (
  currency: any
): ColumnDef<OrderItem>[] => {
  const columns: ColumnDef<OrderItem>[] = [
    {
      accessorKey: "inStock",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="mr-2">In Stock</p>
            <ArrowUpDown className="h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="mr-2">Name</p>
            <ArrowUpDown className="h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="mr-2">Quantity</p>
            <ArrowUpDown className="h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorFn: (row) =>
        `${(row.total || 0) * (row.quantity || 0)} ${currency}`,
      id: "total",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="mr-2">Total Productprice</p>
            <ArrowUpDown className="h-4 w-4" />
          </div>
        );
      },
    },
    {
      accessorFn: (row) => `${row.unitPrice} ${currency}`,
      id: "unitPrice",
      header: ({ column }) => {
        return (
          <div
            className="flex items-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="mr-2">Unit Price</p>
            <ArrowUpDown className="h-4 w-4" />
          </div>
        );
      },
    },
  ];
  return columns;
};
