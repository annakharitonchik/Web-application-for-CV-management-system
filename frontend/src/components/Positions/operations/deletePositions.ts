import { type AxiosError } from 'axios';
import * as React from 'react';
import type { PositionDto } from '../../../dto/position.ts';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const deletePositions = async (
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

  try {
    for (const id of selectedRowKeys) {
      await axiosApi.delete<PositionDto[]>(`/position/${id}`);
    }
    setPositions((await axiosApi.get<PositionDto[]>(`/position`)).data);
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
};
