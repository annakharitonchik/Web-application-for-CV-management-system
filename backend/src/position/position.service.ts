import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PositionDto } from './dto/position.dto';
import { Position } from '../../generated/prisma/client';

@Injectable()
export class PositionService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: PositionDto): Promise<Position> {
    const { name, description, isPublic } = dto;
    return this.prismaService.position.create({
      data: {
        name: name.trim(),
        description,
        isPublic,
      },
    });
  }

  async update(id: number, dto: PositionDto) {
    const { name, description, isPublic, attributes } = dto;
    return this.prismaService.position.update({
      where: { id },
      data: {
        name: name.trim(),
        description,
        isPublic,
        attributes: {
          set: attributes.map((attributeName) => ({ name: attributeName })),
        },
      },
    });
  }

  async delete(id: number) {
    return this.prismaService.position.delete({
      where: { id },
    });
  }

  async getAll() {
    return this.prismaService.position.findMany({
      orderBy: {
        name: 'asc',
      },
      include: {
        attributes: true,
      },
    });
  }
}
