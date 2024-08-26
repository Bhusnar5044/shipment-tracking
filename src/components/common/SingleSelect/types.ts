/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, UseFormRegister } from "react-hook-form";
import { SelectOption } from "../OptionContainer/types";
import { Size, TextFieldVariant } from "../TextField/types";

export type SingleSelectOptionEvent = {
  name: string;
  option?: SelectOption;
  search?: string;
};

export type SingleSelectProps = {
  /** If users edits the search and did not select any value then previous value should hold in input*/
  searchInputCannotBeEmpty?: boolean;
  /** Input variants */
  variant?: TextFieldVariant;
  name: string;
  placeholder?: string;
  /** Disable input */
  disabled?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
  searchable?: boolean;
  options: SelectOption[];
  size?: Size;
  onChange?: (option: SingleSelectOptionEvent) => void;
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
  error?: string;
  /**enables react-hook-form */
  enableRegister?: boolean;
  /** react-hook-form register object*/
  register?: UseFormRegister<FieldValues>;
  /** Min width in px/rem/% (1rem = 10px)*/
  minWidth?: string;
  /** Max width in px/rem/% (1rem = 10px)*/
  maxWidth?: string;
  hideExpandableIcon?: boolean;
  /** className for the main component */
  className?: string;
  /** label Class */
  labelClass?: string;
};
