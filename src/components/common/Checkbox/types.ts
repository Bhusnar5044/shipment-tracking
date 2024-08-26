import type { FieldValues, UseFormRegister } from 'react-hook-form';

export type CheckboxProps = {
  size?: 'small' | 'medium' | 'large'; // You can adjust the available sizes
  label?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  required?: boolean;
  fullWidth?: boolean;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  errorText?: string;
  onChange?: (checked: boolean) => void;
  /** enables react-hook-form */
  enableRegister?: boolean;
  /** react-hook-form register object */
  register?: UseFormRegister<FieldValues>;
  checked?: boolean;
};
