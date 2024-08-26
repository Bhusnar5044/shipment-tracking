import { createApi } from '@reduxjs/toolkit/query/react';

import { urls } from '@/constants/urls';
import { axiosBaseQuery } from '../service';
import { ICustomer } from './types';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// Define an API slice with endpoints
export const createUpdateCustomerApi = createApi({
  reducerPath: 'createUpdateCustomerApi',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL ?? '',
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    updateCustomerPost: build.mutation<ICustomer, Partial<ICustomer> & Pick<ICustomer, '_id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ _id, ...patch }) => ({
        url: _id ? urls.customerById(_id) : urls.customers,
        method: _id ? 'PUT' : 'POST',
        data: patch,
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export API hooks for usage in components
export const { useUpdateCustomerPostMutation } = createUpdateCustomerApi;
