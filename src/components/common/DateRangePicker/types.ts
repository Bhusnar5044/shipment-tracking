import { ReactElement } from 'react';
import { DateRange } from 'react-day-picker';
import { Size, TextFieldVariant } from '../TextField/types';

export interface Preset {
  name: string;
  label: string;
  checked: boolean;
}

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /** Click handler for applying the updates from DateRangePicker. */
  onUpdate: (range: DateRange, type: string) => void;
  /** Initial value for start date */
  initialDateFrom?: Date | string;
  /** Initial value for end date */
  initialDateTo?: Date | string;
  /** Disable input */
  disabled?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
  size?: Size;
  /** Set it true when it is required in any form */
  required?: boolean;
  /** Input label */
  label?: string;
  /** defaultValue */
  defaultValue?: string;
  /** value */
  value?: DateRange;
  /** Helper text */
  helperText?: string;
  /** Error text */
  errorText?: string;
  error?: string;
  /** Min width in px/rem/% (1rem = 10px)*/
  minWidth?: string;
  /** Max width in px/rem/% (1rem = 10px)*/
  maxWidth?: string;
  dateType: string;
  edges?: string;
  Prefix?: ReactElement;
  isErrorPresent?: boolean;
  variant?: TextFieldVariant;
  before?: string | Date; // The `before` prop can be a string or a Date object
  after?: string | Date; // The `after` prop can be a string or a Date object
}
