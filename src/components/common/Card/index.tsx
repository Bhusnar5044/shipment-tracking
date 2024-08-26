import type { FC } from 'react';
import { memo } from 'react';

import type { Props, StaticProps } from './types';
import { cn } from '@/utils';

const CardComponent: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'bg-gray-50 hover:bg-gray-100 flex-col overflow-hidden rounded border border-zinc-300',
        className
      )}
    >
      {children}
    </div>
  );
};

CardComponent.displayName = 'Card';

const Header: FC<Props> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'border-b border-gray-200 bg-white px-4 py-5 sm:px-6',
        className
      )}
    >
      {children}
    </div>
  );
};

Header.displayName = 'Header';

const HeaderTitle: FC<Props> = memo(({ className, as = 'h3', children }) => {
  const Tag = as;

  return (
    <Tag
      className={cn('text-lg font-medium leading-6 text-gray-900', className)}
    >
      {children}
    </Tag>
  );
});

HeaderTitle.displayName = 'HeaderTitle';

const Body: FC<Props> = memo(({ className, children }) => {
  return <div className={cn('p-3', className)}>{children}</div>;
});

Body.displayName = 'Body';

const Footer: FC<Props> = memo(({ className, children }) => {
  return (
    <div className={cn('border-t border-gray-200 bg-white', className)}>
      {children}
    </div>
  );
});

Footer.displayName = 'Footer';

export const Card: FC<Props> & StaticProps = Object.assign(CardComponent, {
  Header,
  HeaderTitle,
  Body,
  Footer,
});
