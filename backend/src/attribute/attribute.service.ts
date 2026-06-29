import { Injectable } from '@nestjs/common';
import { CreateAttributeDto, Category, Type } from './dto/create-attribute.dto';

@Injectable()
export class AttributeService {
  private attributesLibrary = [
    {
      categories: Category.PersonalInformation,
      name: `name`,
      dataTypes: Type.String,
    },
  ];
  create(dto: CreateAttributeDto) {
    const { categories, name, dataTypes } = dto;
    const newAttribute = {
      categories,
      name,
      dataTypes,
    };
    this.attributesLibrary.push(newAttribute);
    return this.attributesLibrary;
  }
}
