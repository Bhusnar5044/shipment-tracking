import { fullHeight, fullWidth } from '@/utils';
import { Placement } from '../../types';
import { StyledPopoverPopupProps } from '../types';
import { getStyleWithArrow } from './WithArrow';

export const getPosition = ({ placement, distance = '0px' }: { placement: Placement; distance?: string }) => {
  switch (placement) {
    case 'top-start':
      return `bottom-[calc(100%+${distance})] left-[0%]`;
    case 'top':
      return `bottom-[calc(100%+${distance})] left-[50%] -translate-x-1/2`;
    case 'top-end':
      return `bottom-[calc(100%+${distance})] right-[0%]`;
    case 'right-start':
      return `top-[0%] left-[calc(100%+${distance})]`;
    case 'right':
      return `left-[calc(100%+${distance})] top-[0%] -translate-y-1/2`;
    case 'right-end':
      return `bottom-0 left-[calc(100%+${distance})]`;
    case 'bottom-start':
      return `top-[calc(100%+${distance})] left-[-6rem]`;
    case 'bottom':
      return `top-[calc(100%+${distance})] left-[50%] -translate-x-1/2`;
    case 'bottom-end':
      return `top-[calc(100%+${distance})] right-[0%]`;
    case 'left-start':
      return `right-[calc(100%+${distance})] top-[0%]`;
    case 'left':
      return `right-[calc(100%+${distance})] top-[50%] -translate-y-1/2`;
    case 'left-end':
      return `right-[calc(100%+${distance})] bottom-[0%];`;
  }
};

export const PopupClasses = (props: StyledPopoverPopupProps) =>
  `z-100 absolute bg-${props.bgColor} ${props.fullWidth && fullWidth()} ${props.fullHeight && fullHeight()} ${getPosition({
    placement: props.placement,
    distance: props.withArrow ? '1.5rem' : props.distance,
  })} ${props.withArrow && getStyleWithArrow}`;
