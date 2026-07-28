import { createContext, useContext } from 'react';
import type { User } from './User.tsx';

interface AuthContextType {
  user: User;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const DEFAULT_USER = {
  email: null,
  role: null,
};

const defaultAuthContext: AuthContextType = {
  user: DEFAULT_USER,
  setToken: async () => {},
  removeToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => useContext(AuthContext);
export const useUser = () => useAuth().user;
