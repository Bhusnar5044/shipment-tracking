/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from 'react';

/**
 * Triggers a function when user clicks outside the given ref or presses Esc key
 *
 * @param {(e: any) => void} onOuterClick function to be fired when user clicks outside
 * @param {React.MutableRefObject<any>} ref ref of the element
 */
export const useOutsideClickNotifier = (onOuterClick: (e: any) => void, isVisible: boolean) => {
  const ref = useRef<any>(null);
  const handleClick = useCallback(
    (e: any) => {
      const isReactDatePicker = e.target.closest('[data-testid = "Day"]');

      if (ref?.current && e.target.isConnected && !ref?.current?.contains(e.target) && !isReactDatePicker && isVisible) {
        onOuterClick(e);
      }
    },
    [isVisible, onOuterClick]
  );

  const handleEscPress = useCallback(
    (e: any) => {
      if (e.keyCode === 27 && isVisible) {
        onOuterClick(e);
      }
    },
    [isVisible, onOuterClick]
  );

  useEffect(() => {
    if (ref?.current) {
      document.addEventListener('click', handleClick);
      document.addEventListener('keydown', handleEscPress);
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [handleClick, handleEscPress, onOuterClick, ref]);

  return ref;
};
