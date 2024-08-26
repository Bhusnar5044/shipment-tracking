/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PropsWithChildren } from 'react';

import type { HTMLProps } from '@/utils';

export interface AncLinkProps extends HTMLProps<HTMLElement>, PropsWithChildren {
  href: string;
  target?: string;
  className?: string;
  /** You can use it to render Text as any component */
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}
