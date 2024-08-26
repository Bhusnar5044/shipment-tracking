/* eslint-disable @typescript-eslint/no-explicit-any */
export type ButtonVariant = 'outline' | 'solid' | 'flat';
export type ButtonEdges = 'square' | 'rounded' | 'circle';
export type ButtonSizes = 'XS' | 'S' | 'M' | 'L' | 'XL';

export type ButtonOptions = {
  /** Use to render any component as Button */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** Use for rendering like Link */
  to?: string | number;
  /** Button sizes */
  size?: ButtonSizes;
  /** Button type */
  type?: 'button' | 'reset' | 'submit';
  /** Button design */
  variant?: ButtonVariant;
  /** Button edges */
  edges?: ButtonEdges;
  /** Use to disable button */
  disabled?: boolean;
  /** Takes full width of the parent component */
  fullWidth?: boolean;
  /** Set it true to show loading state */
  isLoading?: boolean;
  /** Toggle flat button underline: this property will work only on flat variant  */
  hideUnderline?: boolean;
  /** Remove top bottom padding: this property will work only on flat variant  */
  removePadding?: boolean;
};

export type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;
