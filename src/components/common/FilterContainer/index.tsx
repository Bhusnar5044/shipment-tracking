import { cn } from "@/utils";
import { FC, memo } from "react";
import { Props } from "./types";

export const FilterContainer: FC<Props> = memo(({ className, children }) => {
  return (
    <div
      // style={{ maxHeight: advancedSearchEnabled ? `calc(100vh - ${calcFilterHeight}px)` : "" }}
      className={cn("relative w-full py-4", className)}
    >
      {children}
    </div>
  );
});

FilterContainer.displayName = "FilterContainer";
export default FilterContainer;