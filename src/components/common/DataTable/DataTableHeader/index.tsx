import { cn } from '@/utils';
import { flexRender } from '@tanstack/react-table';
import { FC, memo } from 'react';
import { TableHead, TableHeader, TableRow } from '../../TableComponents';
import { Props } from './types';

const DataTableHeader: FC<Props> = memo(({ table }) => {
  return (
    <TableHeader className="sticky top-0 z-2">
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow className="hover:bg-unset" key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => {
            return (
              <TableHead
                key={header.id}
                className={cn('sticky top-0 border-0 bg-blue-50 px-3 py-3', {
                  'pl-5': index === 0,
                  'pr-5': headerGroup.headers.length === index + 1,
                })}
              >
                <div
                  {...{
                    className: `text-grey-700  ${
                      header.column.getCanSort() && header.column.columnDef.enableSorting ? 'cursor-pointer select-none' : ''
                    }`,
                    ...(header.column.columnDef.enableSorting ? { onClick: header.column.getToggleSortingHandler() } : {}),
                  }}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  {{
                    asc: ' 🔼',
                    desc: ' 🔽',
                  }[header.column.getIsSorted() as string] ?? null}
                </div>
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
});

DataTableHeader.displayName = 'DataTableHeader';
export default DataTableHeader;
