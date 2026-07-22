import { IsNotEmpty } from 'class-validator';
import { Role } from '../../../generated/prisma/enums';

export class UserDto {
  @IsNotEmpty()
  id: string;
  email: string;
  password: string;
  role: Role;
}

export class AuthUserDto {
  @IsNotEmpty()
  id: string;
  email: string;
  role: Role;
}
