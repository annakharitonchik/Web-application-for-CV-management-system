import { type AttributeDto } from '../../../dto/attribute.ts';
import { type AxiosError } from 'axios';
import { axiosApi } from '../../../axios.ts';

type NotificationType = 'success' | 'error';

export const editAttribute = async (
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

  try {
    await axiosApi.put<AttributeDto[]>(
      `/attribute/${attribute.id}`,
      changedAttribute,
    );
    setAttributes((await axiosApi.get<AttributeDto[]>(`/attribute`)).data);
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
};
