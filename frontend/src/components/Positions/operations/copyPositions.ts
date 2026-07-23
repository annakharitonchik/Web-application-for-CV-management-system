import axios, { type AxiosError } from 'axios';
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
    try {
      const accessToken = localStorage.getItem('accessToken');

      let selectedPosition: PositionDto;
      for (const id of selectedRowKeys) {
        selectedPosition = positions.find((p) => p.id === id)!;
        await axios.post<PositionDto>(
          `${import.meta.env.VITE_URL}/position`,
          selectedPosition,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }
      setPositions(
        (
          await axios.get<PositionDto[]>(
            `${import.meta.env.VITE_URL}/position`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            },
          )
        ).data,
      );
      openNotificationWithIcon(
        'success',
        'Success',
        `Positions were copied successfully!`,
      );
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      openNotificationWithIcon(
        'error',
        'Error',
        `${axiosError.response?.data?.message}`,
      );
      setLoading(false);
    }
  }, 1000);
};
