import { useState, type ReactNode } from 'react';
import type { User } from './User.tsx';
import { jwtDecode } from 'jwt-decode';
import { AuthContext, DEFAULT_USER } from './AuthContext.tsx';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return jwtDecode<User>(token);
    }
    return DEFAULT_USER;
  });

  const setToken = (token: string) => {
    localStorage.setItem('accessToken', token);
    setUser(jwtDecode<User>(token));
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setUser(DEFAULT_USER);
  };

  return (
    <AuthContext.Provider value={{ user, setToken, removeToken: logout }}>
      {children}
    </AuthContext.Provider>
  );
}
