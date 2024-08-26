import type { FC } from 'react';
import { memo, useCallback } from 'react';

import Icon from '@/components/common//Icon';
import Button from '@/components/common/Button';
import { openSidePanelWithData } from '@/store/features/sidePanel';
import { useAppDispatch } from '@/store/hooks';

import type { Props } from './types';

export const ShowDetailsButton: FC<Props> = memo(({ data, sidePanelKey }) => {
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
    <div>
      <Button onClick={handleButtonClick} variant="outline">
        <Icon iconName="chevron_right" />
      </Button>
    </div>
  );
});

ShowDetailsButton.displayName = 'ShowDetailsButton';
