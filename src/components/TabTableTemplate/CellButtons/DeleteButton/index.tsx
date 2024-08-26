import type { FC } from 'react';
import { memo, useCallback } from 'react';

import Icon from '@/components/common//Icon';
import Button from '@/components/common/Button';

import { toast } from '@/components/common/Toast';
import { useDeleteShipmentMutation } from '@/store/services';
import type { Props } from './types';

export const DeleteButton: FC<Props> = memo(({ data }) => {
  const [deleteShipment, { isLoading }] = useDeleteShipmentMutation();

  const handleButtonClick = useCallback(async () => {
    const response = await deleteShipment(data?._id ?? '');
    if (response) {
      toast('Shipment deleted successfully');
    }
  }, [data, deleteShipment]);

  return (
    <Button variant="outline" isLoading={isLoading} onClick={handleButtonClick} className="size-[30px]">
      <Icon iconName="trash" />
    </Button>
  );
});

DeleteButton.displayName = 'DeleteButton';
