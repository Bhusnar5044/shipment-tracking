export interface TabsProps
  extends React.PropsWithChildren<{
    tabs: string[];
    selectedTab: string;
    onClick: (label: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    screenFit?: boolean;
    isSingleContent?: boolean;
    actionSection?: React.ReactNode;
    filterSection?: React.ReactNode;
  }> {}
