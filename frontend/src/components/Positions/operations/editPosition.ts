import axios, { type AxiosError } from 'axios';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';

type NotificationType = 'success' | 'error';

export const editPosition = (
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
  setTimeout(async () => {
    try {
      await axios.put<PositionDto>(
        `${import.meta.env.VITE_URL}/position/${position.id}`,
        changedPosition,
      );
      setPosition(
        (await axios.get<PositionDto[]>(`${import.meta.env.VITE_URL}/position`))
          .data,
      );
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
  }, 1000);
};
