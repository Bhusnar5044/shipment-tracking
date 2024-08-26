import { cn } from '@/utils';
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from 'react';

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableElement> {
  parentDivClassName?: string;
  tableCalcHeight?: { [key: string]: string };
}

const Table: FC<Props> = memo(
  forwardRef<HTMLTableElement, Props>(({ className, parentDivClassName, tableCalcHeight, children, ...props }, ref) => (
    <div style={tableCalcHeight} className={cn('w-full overflow-auto', parentDivClassName)}>
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  ))
);

Table.displayName = 'Table';
export default Table;
