/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent, ReactElement } from 'react';
import type { FieldValues, UseFormRegister } from 'react-hook-form';

import type { HTMLProps, Omit } from '@/utils';

export type Size = 'S' | 'M';
export type TextFieldVariant = 'outlined' | 'filled';
export type Edges = 'square' | 'rounded';

export type TextFieldEventType = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
export interface TextFieldProps extends Omit<HTMLProps<any>, 'prefix' | 'size' | 'height' | 'onChange'> {
  /** Input variants */
  variant?: TextFieldVariant;
  /** Input edges */
  edges?: Edges;
  /** Input size */
  size?: Size;
  /** Function will be called with the input value on blur and invalid event */
  validator?: (val: any, eventType: ChangeEvent<any>) => string;
  /** Mask format eg. DD / MM / YYYY */
  mask?: string;
  /** Set it true if you do not want to validate on blur event */
  doNotValidateOnBlur?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
  /** Leading icon */
  prefix?: ReactElement;
  /** Trailing icon */
  suffix?: ReactElement;
  /** Disable input */
  disabled?: boolean;
  /** Show prefix, suffix, and character count elements. If set to false, only the input, label, and helper-text icon will be rendered. */
  showDecorators?: boolean;
  /** Set it true when it is required in any form */
  required?: boolean;
  /** Input label */
  label?: string;
  /** defaultValue */
  defaultValue?: string;
  /** value */
  value?: any;
  /** Helper text */
  helperText?: string;
  /** Error text */
  errorText?: string;
  /** Min width in px/rem/% (1rem = 10px) */
  minWidth?: string;
  /** Max width in px/rem/% (1rem = 10px) */
  maxWidth?: string;
  /** To use a text area, set multiline to true. When false, this component will be a text field. */
  multiline?: boolean;
  /** Use minRows when multiline is true; minRows is the number of rows in text area. */
  minRows?: number;
  /** Set it to true to display the character count of the current input value. This requires maxLength prop as well. */
  withCharacterCount?: boolean;
  /** Show Helper text and Error text in a tooltip (popover) */
  showTooltipForHelperAndErrorText?: boolean;
  /** handle onChange event */
  onChange?: (event: TextFieldEventType) => void;
  /** handle onClear event for search */
  handleOnEnter?: (value: string) => void;
  onClear?: () => void;
  /** handle onChange event on enter key */
  enableOnEnter?: boolean;
  /** enables the search feature */
  enableOnSearch?: boolean;
  /** disable bottom margin */
  disableBottomMargin?: boolean;
  /** enables react-hook-form */
  enableRegister?: boolean;
  /** react-hook-form register object */
  register?: UseFormRegister<FieldValues>;
  /** name of the component */
  name: string;
  /** className for the common component */
  className?: string;
  /** className for the label */
  labelClass?: string;
  /** regex for the input field */
  regex?: string;
}

export type suggestion = {
  id: string;
  name: string;
  vendorType: string;
  code: string;
};
