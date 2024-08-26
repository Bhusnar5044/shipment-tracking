import { createApi } from '@reduxjs/toolkit/query/react';

import { urls } from '@/constants/urls';
import { axiosBaseQuery } from '../service';
import { CustomerIds } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const customerIdsApi = createApi({
  reducerPath: 'customerIdsApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  endpoints: (build) => ({
    getCustomerIds: build.query<CustomerIds[], unknown>({
      query: () => {
        // const resultKey = keyResultMapping[key] as TableDataListTypeKey;
        return {
          url: urls.customers,
          method: 'GET',
        };
      },
    }),
  }),
});

// Export API hooks for usage in components
export const { useGetCustomerIdsQuery } = customerIdsApi;
