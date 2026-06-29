import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';

@Injectable()
export class AttributeService {
  private attributesLibrary = [
    {
      category: `personal info`,
      name: `name`,
      type: `string`,
    },
  ];
  create(dto: CreateAttributeDto) {
    const { category, name, type } = dto;
    const newAttribute = {
      category,
      name,
      type,
    };
    this.attributesLibrary.push(newAttribute);
    return this.attributesLibrary;
  }
}
