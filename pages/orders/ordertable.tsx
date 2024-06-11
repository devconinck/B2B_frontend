import { useEffect, useState } from "react";
import { format, isAfter, isBefore } from "date-fns";

import { useRouter } from "next/router";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatePicker } from "./datepicker";
import { DateRange } from "react-day-picker";

import { AuthContextValue, useAuth } from "@/context/authContext";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  sortingValue: String;
  decSorting: boolean;
  datePicker: boolean;
}

export const OrderTable = <
  TData extends { date: string; currency: any },
  TValue
>({
  columns,
  data,
  sortingValue,
  decSorting,
  datePicker,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchValue, setSearchValue] = useState("");
  const [dateFromValue, setDateFromValue] = useState("");
  const [dateToValue, setDateToValue] = useState("");
  const [dataTable, setDataTable] = useState(data);
  const router = useRouter();

  const { role } = useAuth() as AuthContextValue;

  const handleRowClick = async (orderId: any, currency: any) => {
    if (dateFromValue !== "" || dateToValue !== "") {
      setDateFromValue("");
      setDateToValue("");
    }
    await router.push({
      pathname: "/orderdetails",
      query: { orderId, currency },
    });
  };

  const table = useReactTable({
    data: dataTable,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    setSorting([{ id: `${sortingValue}`, desc: decSorting }]);
  }, [sortingValue, decSorting]);

  const handleSearchChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    table.setGlobalFilter(searchValue);
  }, [table, searchValue]);

  const handleDateSelect = (dateRange: DateRange | undefined) => {
    if (dateRange?.from && dateRange?.to) {
      setDateFromValue(format(dateRange?.from, "yyyy-MM-dd"));
      setDateToValue(format(dateRange?.to, "yyyy-MM-dd"));
    } else {
      setDateFromValue("");
      setDateToValue("");
    }
  };

  useEffect(() => {
    const origineel = data;
    if (dateFromValue && dateToValue) {
      const newData: any[] = [];
      data.forEach((o) => {
        if (
          (isBefore(o.date, dateToValue) && isAfter(o.date, dateFromValue)) ||
          o.date === dateFromValue ||
          o.date === dateToValue
        ) {
          newData.push(o);
        }
      });
      setDataTable(newData);
    } else {
      setDataTable(origineel);
    }
  }, [dateFromValue, dateToValue, data, dataTable]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center py-4">
        <Input
          type="search"
          placeholder={`Filter...`}
          value={searchValue}
          onChange={handleSearchChange}
          className="w-full sm:max-w-sm sm:mr-2 mb-2 sm:mb-0"
        />
        {datePicker ? (
          <DatePicker
            onDateSelect={handleDateSelect}
            className="w-full sm:w-auto"
          />
        ) : null}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-dark">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    role === "SUPPLIER" &&
                    window.location.pathname === "/orders"
                      ? handleRowClick(
                          row?.getValue("orderId"),
                          dataTable[row?.index]?.currency
                        )
                      : null;
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* 
      <div className="flex flex-col sm:flex-row sm:items-end justify-end space-x-2 py-4">
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex-items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
          </div>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex w-[100px] sm:w-auto items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} /{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.previousPage();
              }}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.nextPage();
              }}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      */}
    </div>
  );
};
