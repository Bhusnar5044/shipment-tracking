import { cn } from "@/utils";
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableRowElement> {}

const TableRow: FC<Props> = memo(
  forwardRef<HTMLTableRowElement, Props>(({ className, children, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props}>
      {children}
    </tr>
  ))
);

TableRow.displayName = "TableRow";
export default TableRow;