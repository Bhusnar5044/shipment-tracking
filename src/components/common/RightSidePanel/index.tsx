import React from 'react';
import { cn } from '@/utils';

import {Button} from '../Button';
import Icon from '../Icon';
import type { SidePanelProps } from './types';

const RightSidePanel: React.FC<SidePanelProps> = ({
  children,
  isOpen,
  onClose,
  isNested,
  className,
}) => {
  const getPositionsClasses = isNested
    ? 'right-0 md:right-[31rem] lg:right-[31rem] top-0 '
    : 'right-0   ';
  const visibilityClass = isOpen
    ? 'opacity-100 visible translate-x-0'
    : 'opacity-0 invisible translate-x-full';
  return (
    <div
      className={cn(
        `absolute -top-16 z-20 h-screen w-[calc(100vw-1px)] transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:w-[31rem]`,
        visibilityClass,
        getPositionsClasses,
        className,
      )}
    >
      <Button
        variant="flat"
        size="XS"
        edges="circle"
        className="absolute right-2 top-2"
        onClick={onClose}
      >
        <Icon iconName="close" className="text-gray" />
      </Button>
      {children}
    </div>
  );
};

RightSidePanel.displayName = 'RightSidePanel';

export default RightSidePanel;