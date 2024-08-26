import { cn } from '@/utils';
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableSectionElement> {}

const TableFooter: FC<Props> = memo(
  forwardRef<HTMLTableSectionElement, Props>(({ className, children, ...props }, ref) => (
    <tfoot ref={ref} className={cn('bg-primary font-medium text-primary-foreground', className)} {...props}>
      {children}
    </tfoot>
  ))
);

TableFooter.displayName = 'TableFooter';
export default TableFooter;
