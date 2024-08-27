import type { FC } from 'react';

import { cn } from '@/utils';

import type { AncLinkProps } from './types';

const AncLink: FC<AncLinkProps> = ({ href, children, target, className }) => (
  <a
    className={cn(
      'inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700',
      className
    )}
    href={href}
    target={target ?? '_blank'}
  >
    {children}
  </a>
);

export default AncLink;
