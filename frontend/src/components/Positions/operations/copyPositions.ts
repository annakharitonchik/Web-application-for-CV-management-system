import { type AxiosError } from 'axios';
import * as React from 'react';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const copyPositions = async (
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

  try {
    let selectedPosition: PositionDto;
    for (const id of selectedRowKeys) {
      selectedPosition = positions.find((p) => p.id === id)!;

      const selectedPositionView: PositionEditDto = {
        key: selectedPosition.id,
        name: selectedPosition.name,
        description: selectedPosition.description,
        isPublic: selectedPosition.isPublic,
        attributes: selectedPosition.attributes.map(
          (attribute) => attribute.name,
        ),
      };

      await axiosApi.post<PositionDto>(`/position`, selectedPositionView);
    }
    setPositions((await axiosApi.get<PositionDto[]>(`/position`)).data);
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
};
