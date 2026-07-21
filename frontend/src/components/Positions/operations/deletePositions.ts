import axios from 'axios';
import * as React from 'react';
import type { PositionDto } from '../../../dto/position.ts';

type NotificationType = 'success' | 'error';

export const deletePositions = (
  selectedRowKeys: React.Key[],
  setSelectedRowKeys: (arg0: React.Key[]) => void,
  setPositions: (arg0: PositionDto[]) => void,
  setLoading: (arg0: boolean) => void,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);

  setTimeout(async () => {
    for (const id of selectedRowKeys) {
      await axios.delete<PositionDto[]>(
        `${import.meta.env.VITE_URL}/position/${id}`,
      );
    }
    setPositions(
      (await axios.get<PositionDto[]>(`${import.meta.env.VITE_URL}/position`))
        .data,
    );
    openNotificationWithIcon(
      'success',
      'Success',
      `Positions were deleted successfully!`,
    );
    setSelectedRowKeys([]);
    setLoading(false);
  }, 1000);
};
