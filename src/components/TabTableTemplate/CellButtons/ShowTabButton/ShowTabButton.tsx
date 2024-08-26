import type { FC } from 'react';
import { memo, useCallback } from 'react';

import Button from '@/components/common/Button';
import { openSidePanelWithData } from '@/store/features/sidePanel';
import { useAppDispatch } from '@/store/hooks';

import type { Props } from './types';

export const ShowTabButton: FC<Props> = memo(({ sidePanelKey, displayKey, data }) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    dispatch(
      openSidePanelWithData({
        data,
        key: sidePanelKey,
      })
    );
  }, [data, dispatch, sidePanelKey]);

  return (
    <Button size="M" onClick={handleButtonClick} variant="outline" className="mx-2">
      {displayKey}
    </Button>
  );
});

ShowTabButton.displayName = 'ShowTabButton';
