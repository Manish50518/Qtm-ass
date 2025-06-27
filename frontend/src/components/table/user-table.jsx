import { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="w-full bg-black text-white">
      <div className="rounded-lg border border-gray-800 bg-black overflow-hidden shadow-2xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-800 bg-gray-900 hover:bg-gray-900"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-200 font-semibold py-3 px-6"
                    >
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
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`
                    border-b border-gray-800 transition-colors duration-200
                    ${
                      index % 2 === 0
                        ? "bg-black hover:bg-gray-900"
                        : "bg-gray-950 hover:bg-gray-900"
                    }
                  `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="text-gray-100 py-4 px-6"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="bg-black hover:bg-gray-900">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-gray-400 py-8"
                >
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between space-x-2 py-6 px-2">
        <div className="flex-1 text-sm text-gray-400">
          Showing{" "}
          <span className="text-white font-medium">
            {table.getState().pagination.pageIndex * 10 + 1}
          </span>{" "}
          to{" "}
          <span className="text-white font-medium">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * 10,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          of{" "}
          <span className="text-white font-medium">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          entries
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm font-medium text-gray-300">
            Page{" "}
            <span className="text-white">
              {table.getState().pagination.pageIndex + 1}
            </span>{" "}
            of <span className="text-white">{table.getPageCount()}</span>
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="bg-gray-900 border-gray-700 text-white hover:bg-gray-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
