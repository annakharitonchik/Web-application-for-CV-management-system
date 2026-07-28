import { type JwtPayload } from 'jwt-decode';

export interface User extends JwtPayload {
  email: string | null;
  role: string | null;
}
