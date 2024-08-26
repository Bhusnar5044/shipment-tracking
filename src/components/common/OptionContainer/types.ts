/* eslint-disable @typescript-eslint/no-explicit-any */

export type SelectOption = {
  id?: string;
  label: string;
  value: number | string;
  [key: string]: any;
};

export type OptionContainerProps = {
  isOpen: boolean;
  options: SelectOption[];
  value: string | number;
  isLabelExist?: boolean;
  handleOptionClick: (option: SelectOption) => void;
  handleNotFoundOptionClick?: () => void;
};
