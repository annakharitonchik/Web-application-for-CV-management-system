import { Injectable } from '@nestjs/common';
import { AttributeDto } from './dto/attribute.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Attribute } from '../../generated/prisma/client';

@Injectable()
export class AttributeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: AttributeDto): Promise<Attribute> {
    const { category, name, dataType } = dto;

    return this.prismaService.attribute.create({
      data: { category, name, dataType },
    });
  }

  async update(id: number, dto: AttributeDto) {
    const { category, name, dataType } = dto;
    return this.prismaService.attribute.update({
      where: { id },
      data: {
        category,
        name,
        dataType,
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.attribute.delete({
      where: { id },
    });
  }

  async getAll() {
    return this.prismaService.attribute.findMany();
  }
}
