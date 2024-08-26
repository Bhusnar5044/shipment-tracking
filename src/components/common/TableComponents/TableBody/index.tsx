import { cn } from '@/utils';
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableCaptionElement> {}

export const TableBody: FC<Props> = memo(
  forwardRef<HTMLTableSectionElement, Props>(({ className, children, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props}>
      {children}
    </tbody>
  ))
);

TableBody.displayName = 'TableBody';
export default TableBody;
