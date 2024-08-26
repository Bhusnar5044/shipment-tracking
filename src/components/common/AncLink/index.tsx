import type { FC } from 'react';

import { cn } from '@/utils';

import type { AncLinkProps } from './types';

const AncLink: FC<AncLinkProps> = ({ href, children, target, className }) => (
  <a className={cn('underline underline-offset-4 text-blue-500 hover:text-blue-800', className)} href={href} target={target ?? '_blank'}>
    {children}
  </a>
);

export default AncLink;
