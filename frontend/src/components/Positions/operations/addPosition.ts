import { type AxiosError } from 'axios';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const addPosition = async (
  setPositions: (arg0: PositionDto[]) => void,
  setLoading: (arg0: boolean) => void,
  createdPosition: PositionEditDto,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);
  try {
    await axiosApi.post<PositionDto>(`/position`, createdPosition);
    setPositions((await axiosApi.get<PositionDto[]>(`/position`)).data);
    openNotificationWithIcon(
      'success',
      'Success',
      `Position was added successfully!`,
    );
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
