import { PropsWithChildren } from 'react';
import { ButtonEdges, ButtonSizes } from '../Button/types';

export interface ChipProps extends PropsWithChildren {
  label: string;
  icon?: JSX.Element;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  edges?: ButtonEdges;
  className?: string;
  size?: ButtonSizes;
  isLoading?: boolean;
}
