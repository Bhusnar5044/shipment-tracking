'use client';

import type { FC } from 'react';
import { memo, useCallback, useEffect, useState } from 'react';

import { useOutsideClickNotifier } from '@/hooks/useOutsideClickNotifier';
import { cn } from '@/utils';

import { PopoverContext } from './Popover.context';
import Popup from './Popup';
import type { PopoverProps, StaticProps } from './types';

const Component: FC<PopoverProps> = memo(({ className, interactionType, isOpen, handleChange, ...restProps }) => {
  const openStateData = useState(!!isOpen);
  const [openState, setOpenState] = openStateData;

  const handleMouseOver = useCallback(() => interactionType === 'hover' && setOpenState(true), [interactionType, setOpenState]);
  const handleMouseLeave = useCallback(() => interactionType === 'hover' && setOpenState(false), [interactionType, setOpenState]);
  const handleMouseClick = useCallback(() => {
    handleChange?.(!openState);
    return (
      interactionType === 'click' &&
      setOpenState((val) => {
        return !val;
      })
    );
  }, [handleChange, interactionType, openState, setOpenState]);
  const outsideClickCb = useCallback(() => {
    handleChange?.(false);
    return interactionType === 'click' && setOpenState(false);
  }, [handleChange, interactionType, setOpenState]);

  const wrapperRef = useOutsideClickNotifier(outsideClickCb, openState);

  useEffect(() => {
    setOpenState(!!isOpen);
  }, [isOpen, setOpenState]);

  return (
    <PopoverContext.Provider value={openStateData}>
      <div
        className={cn('relative', className)}
        {...restProps}
        ref={wrapperRef}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClick={handleMouseClick}
      />
    </PopoverContext.Provider>
  );
});

Component.displayName = 'Popover';

const Popover: FC<PopoverProps> & StaticProps = Object.assign(Component, {
  Popup,
  Context: PopoverContext,
});

export default Popover;
