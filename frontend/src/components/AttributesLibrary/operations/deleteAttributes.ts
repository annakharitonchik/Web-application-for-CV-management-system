import axios from 'axios';
import type { AttributeDto } from '../../../dto/attribute.ts';
import * as React from 'react';

export const deleteAttributes = (
  selectedRowKeys: React.Key[],
  setSelectedRowKeys: (arg0: React.Key[]) => void,
  setAttributes: (arg0: AttributeDto[]) => void,
  setLoading: (arg0: boolean) => void,
) => {
  setLoading(true);

  setTimeout(async () => {
    for (const id of selectedRowKeys) {
      await axios.delete<AttributeDto[]>(
        `${import.meta.env.VITE_URL}/attribute/${id}`,
      );
    }
    setAttributes(
      (await axios.get<AttributeDto[]>(`${import.meta.env.VITE_URL}/attribute`))
        .data,
    );
    setSelectedRowKeys([]);
    setLoading(false);
  }, 1000);
};
