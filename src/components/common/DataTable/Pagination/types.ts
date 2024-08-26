/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "@tanstack/react-table";

export interface Props {
  table: Table<any>;
  page: number;
  pageSize?: number;
  totalCount: number;
  setQueryParams: (params: Partial<{ page?: number | undefined }>) => void;
  onDownload?: () => void;
  disableDownload: boolean;
}
