/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';

import Button from '@/components/common/Button';
import { openSidePanelWithData } from '@/store/features/sidePanel';
import { useAppDispatch } from '@/store/hooks';

import type { Props } from './types';

function getNestedValue(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

export function ShowDetailsLink<T>({
  data,
  sidePanelKey,
  displayKey,
}: Readonly<Props<T, any>>) {
  const displayValue = getNestedValue(data, displayKey) ?? displayKey;

  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    dispatch(
      openSidePanelWithData({
        data,
        key: sidePanelKey,
      }),
    );
  }, [data, dispatch, sidePanelKey]);

  return (
    <Button onClick={handleButtonClick} variant="flat">
      {['pending_vendor', 'vendorEdit'].includes(sidePanelKey)
        ? displayValue
        : `#${displayValue}`}
    </Button>
  );
}
