import { jwtDecode } from 'jwt-decode';
import type { CustomJwtPayload } from './CustomJwtPayload.tsx';

export class AccessTokenService {
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(accessToken: string): void {
    return localStorage.setItem('accessToken', accessToken);
  }

  removeToken(): void {
    return localStorage.removeItem('accessToken');
  }

  decodeToken(): CustomJwtPayload {
    const token = this.getToken();
    if (token) {
      return jwtDecode<CustomJwtPayload>(token);
    } else {
      return {
        email: null,
        role: null,
      };
    }
  }
}
