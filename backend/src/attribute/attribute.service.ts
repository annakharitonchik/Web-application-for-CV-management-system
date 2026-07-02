import { Injectable } from '@nestjs/common';
import { AttributeDto } from './dto/attribute.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Attribute } from '../../generated/prisma/client';

@Injectable()
export class AttributeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: AttributeDto): Promise<Attribute> {
    const { categories, name, dataTypes } = dto;

    return this.prismaService.attribute.create({
      data: { categories, name, dataTypes },
    });
  }

  async update(id: number, dto: AttributeDto) {
    const { categories, name, dataTypes } = dto;
    return this.prismaService.attribute.update({
      where: { id },
      data: {
        categories,
        name,
        dataTypes,
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.attribute.delete({
      where: { id },
    });
  }
}
