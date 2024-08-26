import { createApi } from '@reduxjs/toolkit/query/react';

import { ListUrls } from '@/constants/urls';

import { axiosBaseQuery } from '../service';
import type { TableListDataQueryTypes, TableListDataType } from './types';

// Define an API slice with endpoints
export const listApi = createApi({
  reducerPath: 'listApi',
  baseQuery: axiosBaseQuery({
    baseUrl: '',
  }),
  endpoints: (build) => ({
    getList: build.query<TableListDataType, TableListDataQueryTypes>({
      query: ({ key, size = 10, page = 1, ...props }) => {
        // const resultKey = keyResultMapping[key] as TableDataListTypeKey;
        const filteredProps: {
          [key: string]: string | boolean | number | undefined | null;
        } = {};
        if (props[key] !== undefined && props[key] !== null) {
          filteredProps[key] = props[key];
        }
        return {
          url: ListUrls[key],
          params: { page, size, ...filteredProps },
          method: 'GET',
        };
      },
    }),
  }),
});

// Export API hooks for usage in components
export const { useGetListQuery } = listApi;
