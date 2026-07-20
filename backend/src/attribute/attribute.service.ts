import { BadRequestException, Injectable } from '@nestjs/common';
import { AttributeDto } from './dto/attribute.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Attribute } from '../../generated/prisma/client';

@Injectable()
export class AttributeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: AttributeDto): Promise<Attribute> {
    const { category, name, dataType } = dto;
    const existedElem = await this.prismaService.attribute.findUnique({
      where: { name },
    });
    if (existedElem) {
      throw new BadRequestException(`Name ${name} is already existed`);
    }
    return this.prismaService.attribute.create({
      data: { category, name: name.trim(), dataType },
    });
  }

  async update(id: number, dto: AttributeDto) {
    const { category, name, dataType } = dto;
    const existedElem = await this.prismaService.attribute.findUnique({
      where: { name },
    });
    if (existedElem) {
      throw new BadRequestException(`Name ${name} is already existed`);
    }
    return this.prismaService.attribute.update({
      where: { id },
      data: {
        category,
        name: name.trim(),
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
    return this.prismaService.attribute.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
