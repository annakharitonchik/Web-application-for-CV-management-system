import { type AxiosError } from 'axios';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const editPosition = async (
  position: PositionDto,
  setPosition: (arg0: PositionDto[]) => void,
  setLoading: (arg0: boolean) => void,
  changedPosition: PositionEditDto,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);

  try {
    await axiosApi.put<PositionDto>(
      `/position/${position.id}`,
      changedPosition,
    );
    setPosition((await axiosApi.get<PositionDto[]>(`/position`)).data);
    openNotificationWithIcon(
      'success',
      'Success',
      `Position was edited successfully!`,
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
