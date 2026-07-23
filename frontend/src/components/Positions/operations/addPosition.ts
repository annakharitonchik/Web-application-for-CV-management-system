import axios, { type AxiosError } from 'axios';
import { type PositionDto, PositionEditDto } from '../../../dto/position.ts';

type NotificationType = 'success' | 'error';

export const addPosition = (
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
  setTimeout(async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      await axios.post<PositionDto>(
        `${import.meta.env.VITE_URL}/position`,
        createdPosition,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      setPositions(
        (
          await axios.get<PositionDto[]>(
            `${import.meta.env.VITE_URL}/position`,
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
        `Attribute was added successfully!`,
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
