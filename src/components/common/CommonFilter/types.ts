/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DateRange {
  from?: Date;
  to?: Date;
}
export interface CommonFilterProps {
  type: string;
  label: string;
  placeholder?: string;
  options?: SelectOption[];
  value?: string | number | boolean | Date | DateRange | Station | Vendor | undefined;
  onChange: (value: string | number | boolean | Date | DateRange | Station | Vendor | undefined | { vendorName: string; vendorId: string }) => void;
  dateType?: string;
  isPrimary?: boolean;
  stateKey: string;
}

export interface SelectOption {
  value: any;
  label: string;
}

export interface Station {
  code: string;
  name: string;
}

export interface Vendor {
  id: string;
  name: string;
}
