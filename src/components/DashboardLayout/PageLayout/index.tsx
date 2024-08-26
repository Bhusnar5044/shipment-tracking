import { FC, HTMLProps, memo } from "react";

const PageLayout: FC<HTMLProps<HTMLDivElement>> = memo(({ children }) => (
  <div className="grid h-screen w-full grid-rows-[auto_1fr] overflow-hidden grid-areas-['header'_'main'] lg:grid-cols-[auto_1fr] lg:grid-areas-['aside_header'_'aside_main']">
    {children}
  </div>
));

PageLayout.displayName = "PageLayout";

export default PageLayout;