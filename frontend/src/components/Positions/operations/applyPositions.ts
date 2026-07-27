import { type AxiosError } from 'axios';
import * as React from 'react';
import type { PositionDto } from '../../../dto/position.ts';
import { AccessTokenService } from '../../AccessTokenService.ts';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const applyPositions = async (
  selectedRowKeys: React.Key[],
  setSelectedRowKeys: (arg0: React.Key[]) => void,
  setLoading: (arg0: boolean) => void,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);

  try {
    const accessTokenService = new AccessTokenService();
    const { email } = accessTokenService.decodeToken();

    for (const id of selectedRowKeys) {
      await axiosApi.put<PositionDto[]>(`/position/${id}/apply`, { email });
    }
    openNotificationWithIcon(
      'success',
      'Success',
      `Positions were applied successfully!`,
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
