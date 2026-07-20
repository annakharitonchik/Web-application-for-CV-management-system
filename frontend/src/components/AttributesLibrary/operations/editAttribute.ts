import { type AttributeDto } from '../../../dto/attribute.ts';
import axios, { type AxiosError } from 'axios';

type NotificationType = 'success' | 'error';

export const editAttribute = (
  attribute: AttributeDto,
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
  changedAttribute: AttributeDto,
  openNotificationWithIcon: (
    type: NotificationType,
    title: string,
    description: string,
  ) => void,
) => {
  setLoading(true);
  setTimeout(async () => {
    try {
      await axios.put<AttributeDto>(
        `${import.meta.env.VITE_URL}/attribute/${attribute.id}`,
        changedAttribute,
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
        `Attribute was edited successfully!`,
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
