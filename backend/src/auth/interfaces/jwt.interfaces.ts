import { Role } from '../../../generated/prisma/enums';

export interface JwtPayload {
  id: string;
  role: Role;
}
