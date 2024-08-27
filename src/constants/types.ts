/* eslint-disable @typescript-eslint/no-explicit-any */
import type { keyPaths } from './globalNavItems';
import { ListUrls } from './urls';

export interface Option {
  value: string;
  label: string;
}

export interface FilterConfig {
  type: string;
  label: string;
  placeholder?: string;
  options?: Option[];
  stateKey: string;
  feature: string[];
  priority: number;
  isPrimary?: boolean;
}

export type KeyPaths = typeof keyPaths;

export type KeyPathsKeys = keyof typeof keyPaths;

export type ListUrlsKeys = keyof typeof ListUrls;

export type ShipmentStatus = 'Pending' | 'In Transit' | 'Arrived' | 'Delivered' | 'Cancelled';

export type UnknownObject = {
  [key: string]: any;
};

export type ResponseMessage = { message: string };
