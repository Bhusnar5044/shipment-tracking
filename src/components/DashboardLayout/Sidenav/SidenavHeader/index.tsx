import Typography from "@/components/common/Typography";
import { FC, memo } from "react";
import { ISideNavHeader } from "../types";

export const SideNavHeader: FC<ISideNavHeader> = memo(({ title, isHovered }) => {
  return (
    <div
      className={`relative box-border flex min-h-[4rem] w-full items-center justify-center gap-3 overflow-hidden px-[0.5rem] py-0 after:absolute after:inset-x-0 after:bottom-0 after:mx-auto after:my-0 after:block after:w-[calc(100%-1rem)] after:border-t after:border-solid after:border-t-gray-20 after:content-['']`}
    >
      <img src="/assets/logo.svg" alt="logo" width="50" height="50" />
      {title && (
        <Typography className={`transition-[0.2s] ${isHovered ? "" : "hidden"}`} variant="h3">
          {title}
        </Typography>
      )}
    </div>
  );
});

SideNavHeader.displayName = "SideNavHeader";
export default SideNavHeader;