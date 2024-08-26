import { PropsWithChildren } from 'react';

export interface Props extends PropsWithChildren {
  isPaddingDisabled?: boolean;
  disableScroll?: boolean;
  className?: string;
}
