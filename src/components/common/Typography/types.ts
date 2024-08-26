/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from '@/utils';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'overline'
  | 'caption'
  | 'subtitle1'
  | 'subtitle2'
  | 'subtitle3'
  | 'button1'
  | 'button2'
  | 'button3';

export type Weight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

export interface Props extends HTMLProps<HTMLElement> {
  id?: string;
  variant?: Variant;
  weight?: Weight;
  children: React.ReactNode;
  typoColor?: string;
  className?: string;
  /** You can use it to render Text as any component*/
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  /** Use for rendering like Link */
  to?: string | number;
  /** customer flow variant flag */
  isCustomer?: boolean;
  /** color variant */
  onSurfaceVariant?: boolean;
}
