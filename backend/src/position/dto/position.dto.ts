import { IsNotEmpty } from 'class-validator';

export class PositionDto {
  @IsNotEmpty()
  name: string;
  description: string;
  isPublic: boolean;
  attributes: string[];
}
