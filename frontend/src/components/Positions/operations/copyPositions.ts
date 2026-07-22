import axios from 'axios';
import * as React from 'react';
import type { PositionDto } from '../../../dto/position.ts';

type NotificationType = 'success' | 'error';

export const copyPositions = (
  positions: PositionDto[],
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
    let selectedPosition: PositionDto;
    for (const id of selectedRowKeys) {
      selectedPosition = positions.find((p) => p.id === id)!;
      await axios.post<PositionDto>(
        `${import.meta.env.VITE_URL}/position`,
        selectedPosition,
      );
    }
    setPositions(
      (await axios.get<PositionDto[]>(`${import.meta.env.VITE_URL}/position`))
        .data,
    );
    openNotificationWithIcon(
      'success',
      'Success',
      `Positions were copied successfully!`,
    );
    setSelectedRowKeys([]);
    setLoading(false);
  }, 1000);
};
