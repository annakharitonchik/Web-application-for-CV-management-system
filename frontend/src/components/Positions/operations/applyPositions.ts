import axios, { type AxiosError } from 'axios';
import * as React from 'react';
import type { PositionDto } from '../../../dto/position.ts';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

type NotificationType = 'success' | 'error';
interface CustomJwtPayload extends JwtPayload {
  email?: string;
}
export const applyPositions = (
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

  setTimeout(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const email =
        accessToken && jwtDecode<CustomJwtPayload>(accessToken).email;
      for (const id of selectedRowKeys) {
        await axios.put<PositionDto[]>(
          `${import.meta.env.VITE_URL}/position/${id}/apply`,
          { email },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
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
  }, 1000);
};
