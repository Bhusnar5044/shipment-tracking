/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';
import Typography from '../../Typography';
import { ColumnTypes } from '../types';

export const getColumns = (columnsArr: ColumnTypes<any>[]): ColumnDef<any>[] =>
  columnsArr.map((item) => ({
    accessorKey: item.accessorKey,
    header: item?.headerComponent ?? item.header,
    cell: item.cellComponent ?? (({ row }) => <Typography variant="body3">{row.getValue(item.accessorKey)}</Typography>),
    enableHiding: item.enableHiding,
    enableSorting: item.enableSort,
  }));
