'use client';

import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react';
import { createContext, memo, useMemo, useState } from 'react';

export type SideNavContextType = {
  isExpanded: boolean;
  setIsExpanded?: Dispatch<SetStateAction<boolean>>;
};

export const SideNavContext = createContext({
  isExpanded: false,
} as SideNavContextType);

interface Props extends PropsWithChildren {}

export const SideNavContextProvider: FC<Props> = memo(({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const value = useMemo(() => ({ isExpanded, setIsExpanded }), [isExpanded]);

  return (
    <SideNavContext.Provider value={value}>{children}</SideNavContext.Provider>
  );
});

SideNavContextProvider.displayName = 'SideNavContextProvider';
