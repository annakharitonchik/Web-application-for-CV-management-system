import axios, { type AxiosError } from 'axios';
import type { AttributeDto } from '../../../dto/attribute.ts';
import * as React from 'react';

type NotificationType = 'success' | 'error';

export const deleteAttributes = (
  selectedRowKeys: React.Key[],
  setSelectedRowKeys: (arg0: React.Key[]) => void,
  setAttributes: (arg0: AttributeDto[]) => void,
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
      for (const id of selectedRowKeys) {
        await axios.delete<AttributeDto[]>(
          `${import.meta.env.VITE_URL}/attribute/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
      }
      setAttributes(
        (
          await axios.get<AttributeDto[]>(
            `${import.meta.env.VITE_URL}/attribute`,
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
        `Attributes were deleted successfully!`,
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
