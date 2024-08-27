/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from 'react';
import { memo, useCallback } from 'react';

import Icon from '@/components/common//Icon';
import Button from '@/components/common/Button';

import { toast } from '@/components/common/Toast';
import { useDeleteShipmentMutation } from '@/store/services';
import { useNavigate } from 'react-router-dom';
import type { Props } from './types';

export const DeleteButton: FC<Props> = memo(({ data }) => {
  const [deleteShipment, { isLoading }] = useDeleteShipmentMutation();
  const navigate = useNavigate();

  const handleButtonClick = useCallback(async () => {
    const { data: result, error } = await deleteShipment({ _id: data?._id ?? '' });
    const errorResult = error as any;
    if (result) {
      toast('Shipment deleted successfully');
      navigate(0);
    }
    if (errorResult?.data) {
      toast(errorResult.data?.message ?? 'Shipment deletion Failed');
    }
  }, [data?._id, deleteShipment, navigate]);

  return (
    <Button variant="outline" isLoading={isLoading} onClick={handleButtonClick}>
      <Icon iconName="delete" />
    </Button>
  );
});

DeleteButton.displayName = 'DeleteButton';
