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
        return {
          url: ListUrls[key],
          params: { page, size, ...props },
          method: 'GET',
        };
      },
    }),
  }),
});

// Export API hooks for usage in components
export const { useGetListQuery } = listApi;
