/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListUrlsKeys } from "@/constants/types";
import { TableListDataType } from "@/store/services/listApi/types";
import { Dispatch, SetStateAction } from "react";

export type Props = {
  storeKey?: string;
  serviceApiKey: ListUrlsKeys;
  defaultTab: string;
  tabs: string[];
  tabType?: string;
  transactionId?: string;
  title?: string;
  subtitle?: string;
  onRowClick?: (rowData: unknown) => void;
  buttonComp?: React.ReactNode;
};

export interface RowData {
  id: string;
  orderId: string;
  vendorName: string;
  payment_type: string;
  amountPayable: number;
  starRating: number;
  feedbackText: string;
  isComplain: boolean;
  createdAt: string;
  outletName: string;
  month: string;
  billOfSupply: string;
  report: string;
  status: string;
  remark: string;
  billNo: string;
}

export interface CellComponentProps<T> {
  row: {
    original: T;
  };
}

export type QueryParams = {
  page?: string;
  size?: string;
  sort?: string;
  startDate?: string;
  endDate?: string;
  stationCode?: string;
  stationName?: string;
  orderId?: string;
  orderStatus?: string;
  orderStartDate?: string;
  orderEndDate?: string;
  vendorName?: string;
  complainFromDate?: string;
  complainToDate?: string;
  isComplain?: boolean | undefined;
  isResolved?: boolean | undefined;
  paymentType?: string;
  complaintType?: string;
  complaintId?: string;
  gst?: string;
};

export type queryParamsType = QueryParams & {
  tab: string;
  enabled?: boolean;
  vendorId?: string;
  isVendor?: string;
  status?: string;
  isActive?: boolean;
};

export interface UseContentReturnProps {
  setQueryParams: (
    params: Partial<
      QueryParams & {
        sidePanelKey?: string;
        sidePanelItemId?: string;
        key: string;
        tab?: string;
        orderType?: string;
        affiliateId?: string;
        orderFrom?: string;
      }
    >
  ) => void;
  data?: TableListDataType;
  selectedTab: string;
  size: number;
  queryParams?: URLSearchParams;
  status: string;
  handleTabChange: (selectedTab: string) => void;
  refetch: () => void;
  showMoreFilters: boolean;
  setShowMoreFilters: Dispatch<SetStateAction<boolean>>;
  filtersApplied: boolean;
  setFiltersApplied: Dispatch<SetStateAction<boolean>>;
  clearFilter: () => void;
  applyFilter: () => void;
  filters: any;
  handleFilterChange: (key: string, value: any) => void;
  hasWriteAccess: boolean;
}
