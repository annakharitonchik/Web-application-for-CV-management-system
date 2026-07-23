import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthUserDto, UserDto } from './dto/user.dto';
import { hashSync, genSaltSync } from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(dto: UserDto): Promise<AuthUserDto> {
    const { email, password, role } = dto;
    const hashedPassword = this.hashPassword(password);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = await this.prismaService.user.create({
      data: {
        email,
        password: hashedPassword,
        role,
      },
    });

    return user;
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
