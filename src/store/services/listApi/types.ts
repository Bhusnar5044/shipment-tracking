/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListUrlsKeys } from '@/constants/types';

// Added null type due to ReadOnlyLSearchParams type
export type TableListDataQueryTypes = {
  key: ListUrlsKeys;
  enabled?: boolean | null;
  size: number;
  sort?: string | null;
  page?: number | null;
  ggmStatus?: string | null;
  zoneStatus?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  id?: string | null;
  vendorName?: string | null;
  vendorId?: string | null;
  stationCode?: string | null;
  stationName?: string | null;
  status?: string | null;
  [key: string]: string | null | number | undefined | boolean;
};

export interface KeyResultMapping {
  [key: string]: string;
}

export type TableListDataType = {
  list: any[];
  totalCount: number;
};
