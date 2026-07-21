import type { AttributeDto } from './attribute.ts';

export class PositionDto {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  attributes: AttributeDto[];
}

export class PositionDtoView {
  key: number;
  name: string;
  description: string;
  isPublic: boolean;
  attributes: AttributeDto[];
}

export class PositionEditDto {
  key: number;
  name: string;
  description: string;
  isPublic: boolean;
  attributes: string[];
}
