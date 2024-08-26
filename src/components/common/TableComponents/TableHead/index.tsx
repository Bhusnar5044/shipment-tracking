import { cn } from '@/utils';
import { FC, forwardRef, memo, PropsWithChildren, ThHTMLAttributes } from 'react';

interface Props extends PropsWithChildren, ThHTMLAttributes<HTMLTableCellElement> {}

const TableHead: FC<Props> = memo(
  forwardRef<HTMLTableCellElement, Props>(({ className, children, ...props }, ref) => (
    <th ref={ref} className={cn('h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0', className)} {...props}>
      {children}
    </th>
  ))
);

TableHead.displayName = 'TableHead';
export default TableHead;
