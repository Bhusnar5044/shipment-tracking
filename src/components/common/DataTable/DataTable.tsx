/* eslint-disable @typescript-eslint/no-explicit-any */
import useQueryParams from "@/hooks/useQueryParams";
import { cn } from "@/utils";
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, Row, SortingState, useReactTable } from "@tanstack/react-table";
import { memo, useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "../TableComponents";
import DataTableHeader from "./DataTableHeader";
import Pagination from "./Pagination";
import { DataTableProps } from "./types";
import { getColumns } from "./utils/getColumns";

function Component({
  columns,
  data,
  noResultText = "No results.",
  totalCount,
  onDownload,
  disableDownload,
  onRowClick,
}: Readonly<DataTableProps<any>>) {
  const columnsArr = getColumns(columns);
  const [sorting, setSorting] = useState<SortingState>([]);
  // helper: sideNav expand flag
  // const { isExpanded } = useContext(SideNavContext);
  const { queryParams, setQueryParams } = useQueryParams<{
    page?: number;
  }>();
  const page = queryParams?.get("page") ?? "1";
  const table = useReactTable({
    data,
    columns: columnsArr,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  const handleRowClick = (row: Row<any>) => {
    if (onRowClick) {
      onRowClick(row.original);
    }
  };

  return (
    <>
      <Table
        className="table-striped mb-4 w-full table-auto border-collapse whitespace-nowrap bg-white"
        parentDivClassName={cn(
          "no-scrollbar relative overflow-x-auto overflow-y-auto bg-white md:w-full mb-4"
        )}
      >
        <DataTableHeader table={table} />
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow className="odd:bg-white even:bg-gray-50" key={row.id} onClick={() => handleRowClick(row)}>
                {row.getVisibleCells().map((cell, index) => (
                  <TableCell
                    key={cell.id}
                    className={cn("odd:text-gray-900 even:text-gray-700 ", {
                      "pl-5": index === 0,
                      "pr-5": row.getVisibleCells().length === index + 1,
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {noResultText}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div
        className={cn(
          "fixed bottom-0 z-2 flex w-full items-center border-t-[1px] border-gray-50 even:bg-blue-50 p-2 lg:w-[calc(100%-6.5rem)]"
        )}
      >
        <div className={cn("flex w-full flex-col items-center justify-between gap-1 px-2 md:flex-row", { "justify-end": disableDownload })}>
          <Pagination
            table={table}
            page={+page}
            totalCount={totalCount}
            setQueryParams={setQueryParams}
            onDownload={onDownload}
            disableDownload={!!disableDownload}
          />
        </div>
      </div>
    </>
  );
}

export const DataTable = memo(Component);
