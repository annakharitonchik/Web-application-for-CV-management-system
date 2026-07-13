import { type AttributeDto } from '../../../dto/attribute.ts';
import axios from 'axios';

export const addAttribute = (
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
  createdAttribute: AttributeDto,
) => {
  setLoading(true);
  setTimeout(async () => {
    await axios.post<AttributeDto>(
      `${import.meta.env.VITE_URL}/attribute`,
      createdAttribute,
    );
    setAttributes(
      (await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`))
        .data,
    );
    setLoading(false);
  }, 1000);
};
