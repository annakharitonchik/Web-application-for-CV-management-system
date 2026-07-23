import axios, { type AxiosError } from 'axios';
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
    try {
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
