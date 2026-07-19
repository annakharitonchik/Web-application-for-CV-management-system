import { type AttributeDto } from '../../../dto/attribute.ts';
import axios, { type AxiosError } from 'axios';

export const addAttribute = (
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
  createdAttribute: AttributeDto,
) => {
  setLoading(true);
  setTimeout(async () => {
    await axios
      .post<AttributeDto>(
        `${import.meta.env.VITE_URL}/attribute`,
        createdAttribute,
      )
      .catch((error: AxiosError<{ message: string }>) => {
        console.log(error.response?.data?.message);
        setLoading(false);
      });
    setAttributes(
      (await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`))
        .data,
    );
    setLoading(false);
  }, 1000);
};
