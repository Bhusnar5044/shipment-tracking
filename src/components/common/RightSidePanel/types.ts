/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from 'react';

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
  isNested?: boolean;
  sidePanelData?: any;
  sidePanelKey?: string;
  className?: string;
}
