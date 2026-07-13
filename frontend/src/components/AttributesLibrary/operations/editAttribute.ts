import { type AttributeDto } from '../../../dto/attribute.ts';
import axios from 'axios';

export const editAttribute = (
  attribute: AttributeDto,
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
  changedAttribute: AttributeDto,
) => {
  setLoading(true);
  setTimeout(async () => {
    await axios.put<AttributeDto>(
      `${import.meta.env.VITE_URL}/attribute/${attribute.id}`,
      changedAttribute,
    );
    setAttributes(
      (await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`))
        .data,
    );
    setLoading(false);
  }, 1000);
};
