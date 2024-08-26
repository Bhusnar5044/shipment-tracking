import { cn } from "@/utils";
import { FC, forwardRef, HTMLAttributes, memo, PropsWithChildren } from "react";

interface Props extends PropsWithChildren, HTMLAttributes<HTMLTableCaptionElement> {}

export const TableCaption: FC<Props> = memo(
  forwardRef<HTMLTableCaptionElement, Props>(({ className, children, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </caption>
  ))
);
TableCaption.displayName = "TableCaption";
export default TableCaption;