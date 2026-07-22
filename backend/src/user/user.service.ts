import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../../generated/prisma/client';
import { UserDto } from './dto/user.dto';
import { hashSync, genSaltSync } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: UserDto): Promise<User> {
    const { email, password, role } = dto;
    const hashedPassword = this.hashPassword(password);
    return this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });
  }
  async findOne(email: string) {
    return this.prismaService.user.findFirst({
      where: { email },
    });
  }
  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }
}
