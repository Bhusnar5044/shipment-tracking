import { cn } from "@/utils";
import { FC, forwardRef, memo, PropsWithChildren, TdHTMLAttributes } from "react";

interface Props extends PropsWithChildren, TdHTMLAttributes<HTMLTableCellElement> {}

const TableCell: FC<Props> = memo(
  forwardRef<HTMLTableCellElement, Props>(({ className, children, ...props }, ref) => (
    <td ref={ref} className={cn("p-3 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props}>
      {children}
    </td>
  ))
);

TableCell.displayName = "TableCell";
export default TableCell;