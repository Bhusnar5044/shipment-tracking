/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListUrlsKeys } from '@/constants/types';
import { useAuth } from '@/context/AuthProvider';
import useQueryParams from '@/hooks/useQueryParams';
import { useGetListQuery } from '@/store/services';
import { dateFormatterForApi } from '@/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { UseContentReturnProps, queryParamsType } from './types';

export const useContent = (serviceApiKey: ListUrlsKeys, defaultTab: string, tabType: string): UseContentReturnProps => {
  const [filters, setFilters] = useState<any>({});
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const { role = '', email = '' } = useAuth()?.user ?? {};

  const { queryParams, setQueryParams } = useQueryParams<queryParamsType>(),
    tab = queryParams?.get('tab') ?? defaultTab,
    page = +(queryParams?.get('page') ?? 1),
    size = +(queryParams?.get('size') ?? 10),
    sort = queryParams?.get('sort') ?? '',
    startDate = queryParams?.get('startDate') ?? '',
    endDate = queryParams?.get('endDate') ?? '',
    status = queryParams?.get('status') ?? '',
    shipmentId = queryParams?.get('shipmentId') ?? '',
    origin = queryParams?.get('origin') ?? '',
    destination = queryParams?.get('destination') ?? '';

  const queryProps = useMemo(() => {
    const filterProps = {
      startDate: startDate && dateFormatterForApi(new Date(startDate)),
      endDate: endDate && dateFormatterForApi(new Date(endDate)),
    };

    const filtersQUeryProps = {
      key: serviceApiKey,
    };
    setFilters({
      ...filterProps,
      shipmentId,
      origin,
      destination,
    });
    return filtersQUeryProps;
  }, [destination, endDate, origin, serviceApiKey, shipmentId, startDate]);

  const { data, refetch } = useGetListQuery({
    page,
    size,
    sort,
    ...queryProps,
    ...(role === 'Customer' ? { customerId: email } : {}),
  });

  const handleTabChange = useCallback(
    (tabVal: string) => {
      setQueryParams({});
      setQueryParams({ [tabType ?? tab]: tabVal });
    },
    [setQueryParams, tab, tabType]
  );

  const hasWriteAccess = true;

  const applyFilter = useCallback(() => {
    const startDate = filters?.commonDateRange?.from?.toISOString();
    const endDate = filters?.commonDateRange?.to?.toISOString();

    const params: Partial<{ [key: string]: string | undefined | boolean }> = {
      startDate,
      endDate,
      page: '1',
    };

    for (const key in filters) {
      if (filters[key] && typeof filters[key] === 'string' && params[key] === undefined) {
        params[key] = filters[key];
      }
    }

    setQueryParams(params);
    refetch();
  }, [filters, refetch, setQueryParams]);

  const clearFilter = useCallback(() => {
    setQueryParams({});
    setFilters({});
    refetch();
  }, [refetch, setQueryParams]);

  const handleFilterChange = useCallback((key: string, value: any) => {
    setFilters((prevFilters: any) => ({
      ...prevFilters,
      ...(key === 'vendorName' ? value : { [key]: value }),
    }));
  }, []);

  useEffect(() => {
    let flag = false;
    for (const key in filters) {
      if ((filters[key] as DateRange)?.from && (filters[key] as DateRange)?.to) {
        flag = true;
        break;
      } else if (!(filters[key] as DateRange)?.from && filters[key]) {
        flag = true;
        break;
      }
    }
    setFiltersApplied(flag);
  }, [filters]);

  return {
    queryParams,
    selectedTab: tab,
    data,
    size,
    refetch,
    status: status ?? 'All',
    setQueryParams,
    showMoreFilters,
    setShowMoreFilters,
    filtersApplied,
    setFiltersApplied,
    clearFilter,
    applyFilter,
    handleFilterChange,
    filters,
    hasWriteAccess,
    handleTabChange,
  };
};
