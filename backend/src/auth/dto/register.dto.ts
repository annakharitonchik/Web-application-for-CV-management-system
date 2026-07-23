import { Role } from '../../../generated/prisma/enums';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterRequest {
  @IsString()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  role: Role;
}
