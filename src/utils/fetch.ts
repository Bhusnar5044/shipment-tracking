/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { loadState } from './localStorage';

export interface AxiosReturn {
  response?: AxiosResponse<any>;
  error?: AxiosResponse<any>;
}

const BASE_URL = import.meta.env.VITE_BASE_URL;
export async function fetch(config: AxiosRequestConfig, token?: string, noAuthorization?: boolean): Promise<AxiosReturn> {
  const { tokens = {} } = loadState('user') || {};
  const {headers, url, ...restConfig} = config;
  try {
    const request = {
      ...restConfig,
      url: `${BASE_URL}${url}`,
      headers: {
        ...(headers ?? {}),
        ...(!noAuthorization
          ? {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token ?? tokens?.access_token}`,
            }
          : {}),
      },
    };
    const response = await axios(request);
    return { response: { ...(response || { config, status: 500, data: '', headers: {}, statusText: '' }) } };
  } catch (error: any) {
    return { error: { ...(error.response || { status: 500, data: error, variant: 'error' }) } };
  }
}
