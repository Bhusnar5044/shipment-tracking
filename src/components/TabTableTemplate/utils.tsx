import { FilterConfig } from '@/constants/types';
import { shipmentColumn } from './columns/shipments';

import { shipmentFilterConfig } from './filterContent/filterConfigs/shipmentFilterConfig';

export const getTabContentColumns = (key: string) => {
  switch (key) {
    case 'shipments':
      return shipmentColumn;
    default:
      return [];
  }
};

export const getActionSectionComponent = (key: string): FilterConfig[] | null => {
  switch (key) {
    case 'shipments':
      return shipmentFilterConfig;
    default:
      return null;
  }
};
