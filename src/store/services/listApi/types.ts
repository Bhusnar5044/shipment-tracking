/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListUrlsKeys } from '@/constants/types';

// Added null type due to ReadOnlyLSearchParams type
export type TableListDataQueryTypes = {
  key: ListUrlsKeys;
  size: number;
  sort?: string;
  page?: number;
  shipmentId?: string;
  origin?: string;
  destination?: string;
  startDate?: string;
  endDate?: string;
  customerId?: string;
};

export interface KeyResultMapping {
  [key: string]: string;
}

export type TableListDataType = {
  list: any[];
  totalCount: number;
};
