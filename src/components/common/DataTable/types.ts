/* eslint-disable @typescript-eslint/no-explicit-any */
import { CellContext, ColumnDef, HeaderContext } from '@tanstack/react-table';

export interface ExtendedColumnTypes<TData> {
  accessorKey: string;
  header: string;
  headerComponent?: (props: HeaderContext<TData, unknown>) => JSX.Element;
  enableSort?: boolean;
  headerUpperCase?: boolean;
  cellComponent?: (props: CellContext<TData, unknown>) => JSX.Element;
  enableHiding?: boolean;
}

export type ColumnTypes<T> = ColumnDef<T> & ExtendedColumnTypes<T>;

export interface DataTableProps<TData> {
  columns: ColumnTypes<TData>[];
  data: TData[];
  totalCount: number;
  noResultText?: string;
  pageSize?: number;
  onDownload?: () => void;
  disableDownload?: boolean;
  onRowClick?: any;
  calcHeight?: number;
  advancedSearchEnabled?: boolean;
}
