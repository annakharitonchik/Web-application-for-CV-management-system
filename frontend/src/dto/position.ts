import type { AttributeDto } from './attribute.ts';
import { UserDtoView } from './user.ts';

export class PositionDto {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  attributes: AttributeDto[];
  users: UserDtoView[];
}

export class PositionDtoView {
  key: number;
  name: string;
  description: string;
  isPublic: string;
  attributes: AttributeDto[];
  users: UserDtoView[];
}

export class PositionEditDto {
  key: number;
  name: string;
  description: string;
  isPublic: boolean;
  attributes: string[];
}
