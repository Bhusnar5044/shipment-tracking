import { FieldValues, UseFormRegister } from 'react-hook-form';
import { TextFieldVariant } from '../TextField/types';

export type Props = {
  size: 'S' | 'M';
  date: Date | undefined;
  onChange: (value: Date, name: string) => void;
  fullWidth?: boolean;
  minWidth?: string;
  maxWidth?: string;
  label?: string;
  className?: string;
  /**enables react-hook-form */
  enableRegister?: boolean;
  /** react-hook-form register object*/
  register?: UseFormRegister<FieldValues>;
  name?: string;
  disabled?: boolean;
  dateType: string;
  edges?: string;
  isErrorPresent?: boolean;
  errorText?: string;
  variant?: TextFieldVariant;
};
