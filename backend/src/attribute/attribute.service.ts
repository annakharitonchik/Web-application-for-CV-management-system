import { Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Attribute } from '../../generated/prisma/client';

@Injectable()
export class AttributeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateAttributeDto): Promise<Attribute> {
    const { categories, name, dataTypes } = dto;

    return this.prismaService.attribute.create({
      data: { categories, name, dataTypes },
    });
  }
}
