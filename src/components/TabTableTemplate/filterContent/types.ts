/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommonFilterProps } from '@/components/common/CommonFilter/types';
import { Dispatch, SetStateAction } from 'react';

export interface Props {
  setQueryParams: (params: Partial<{ [key: string]: string | undefined }>) => void;
  queryParams?: URLSearchParams;
  filters: any;
  handleFilterChange: (key: string, value: any) => void;
}

export interface FilterComponentProps {
  queryParams?: URLSearchParams;
  setQueryParams: (params: Partial<{ [key: string]: string | undefined }>) => void;
  serviceApiKey: string;
  showMoreFilters: boolean;
  filtersApplied: boolean;
  setFiltersApplied: Dispatch<SetStateAction<boolean>>;
  clearFilter: () => void;
  applyFilter: () => void;
  handleFilterChange: (key: string, value: any) => void;
  filters: any;
}

interface CommonProps {
  serviceApiKey: string;
  clearFilter: () => void;
  applyFilter: () => void;
  handleFilterChange: (key: string, value: any) => void;
  filters: any;
  filtersApplied: boolean;
}

export interface ActionSectionProps extends CommonProps {
  setShowMoreFilters: Dispatch<SetStateAction<boolean>>;
  buttonComp?: React.ReactNode;
  showMoreFilters: boolean;
}

export interface FilterSectionProps extends CommonProps {
  queryParams?: URLSearchParams;
  setQueryParams: (params: Partial<{ [key: string]: string | undefined }>) => void;
  showMoreFilters: boolean;
}

export interface ListWithFormFilterProps {
  clearFilter?: () => void;
  applyFilter?: () => void;
  filtersApplied: boolean;
  onChange: CommonFilterProps['onChange'];
  filters: { stationCode: string; vendorId: string; temporaryId: string; vendorName: string };
}
