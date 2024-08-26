import type { FC } from 'react';
import { memo, useCallback } from 'react';

import Icon from '@/components/common//Icon';
import Button from '@/components/common/Button';
import { openSidePanelWithData } from '@/store/features/sidePanel';
import { useAppDispatch } from '@/store/hooks';

import type { Props } from './types';

export const EditDetailsButton: FC<Props> = memo(({ data, sidePanelKey }) => {
  const dispatch = useAppDispatch();

  const handleButtonClick = useCallback(() => {
    dispatch(openSidePanelWithData({ data, key: sidePanelKey }));
  }, [data, dispatch, sidePanelKey]);

  return (
    <Button
      variant="outline"
      onClick={handleButtonClick}
      className="size-[30px]"
    >
      <Icon iconName="edit" />
    </Button>
  );
});

EditDetailsButton.displayName = 'ShowDetailsButton';
