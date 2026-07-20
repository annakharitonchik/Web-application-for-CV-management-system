import { IsNotEmpty } from 'class-validator';
import { AttributeDto } from '../../attribute/dto/attribute.dto';

export class PositionDto {
  @IsNotEmpty()
  name: string;
  description: string;
  isPublic: boolean;
  attributes: AttributeDto[];
}
