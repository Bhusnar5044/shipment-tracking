import { cn } from '@/utils';
import type { FC } from 'react';
import { forwardRef, memo, useCallback, useContext } from 'react';
import { PopoverContext } from '../Popover.context';
import { PopupClasses } from './styled/Popup';
import { PopoverPopupProps } from './types';

const Popup: FC<PopoverPopupProps> = memo(
  forwardRef(
    (
      { placement = 'bottom', withArrow, distance = '0px', fullWidth, fullHeight, bgColor = 'gray-100', id = 'popover-popup', className, ...rest },
      ref
    ) => {
      const [isOpen] = useContext(PopoverContext),
        stopPropagation = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);
      const mergedClasses = cn(PopupClasses({ placement: placement!, withArrow, distance, fullHeight, fullWidth, bgColor }), className);
      return isOpen ? <div className={mergedClasses} id={id} ref={ref} onClick={stopPropagation} {...rest} /> : null;
    }
  )
);

Popup.displayName = 'Popup';

export default Popup;
