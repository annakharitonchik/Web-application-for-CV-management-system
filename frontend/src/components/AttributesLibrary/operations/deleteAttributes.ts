import { type AxiosError } from 'axios';
import type { AttributeDto } from '../../../dto/attribute.ts';
import * as React from 'react';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const deleteAttributes = async (
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

  try {
    for (const id of selectedRowKeys) {
      await axiosApi.delete<AttributeDto[]>(`/attribute/${id}`);
    }
    setAttributes((await axiosApi.get<AttributeDto[]>(`/attribute/`)).data);
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
};
