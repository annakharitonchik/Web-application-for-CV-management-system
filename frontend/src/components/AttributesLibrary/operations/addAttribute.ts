import { type AttributeDto } from '../../../dto/attribute.ts';
import axios, { type AxiosError } from 'axios';

type NotificationType = 'success' | 'error';

export const addAttribute = (
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
  createdAttribute: AttributeDto,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);
  setTimeout(async () => {
    try {
      await axios.post<AttributeDto>(
        `${import.meta.env.VITE_URL}/attribute`,
        createdAttribute,
      );
      setAttributes(
        (
          await axios.get<AttributeDto[]>(
            `${import.meta.env.VITE_URL}/attribute`,
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
