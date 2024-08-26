import { cn } from '@/utils';
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableSectionElement> {}

const TableHeader: FC<Props> = memo(
  forwardRef<HTMLTableSectionElement, Props>(({ className, children, ...props }, ref) => (
    <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props}>
      {children}
    </thead>
  ))
);

TableHeader.displayName = 'TableHeader';
export default TableHeader;
