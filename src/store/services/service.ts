/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosRequestConfig } from 'axios';

import { getRoleAndPermissions } from '@/utils/getRoleAndPermissions';
import axiosInstance from './axiosInstance';

export type AxiosOptions = {
  withToken?: boolean;
} & AxiosRequestConfig;

type APIResponse<T = any> = {
  message?: string;
  result?: T;
  status?: string;
};

export type Response<T = any> = {
  success: boolean;
  data?: T | APIResponse<T>;
  message?: string;
};

// api.js
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
    const { token } = getRoleAndPermissions();
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers: {
          ...(headers ?? {}),
          ...(token
            ? {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token ?? ''}`,
              }
            : {}),
        },
      });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
