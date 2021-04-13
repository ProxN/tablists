import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/entities';

interface AuthState {
  user?: IUser | null;
  isAuthenticated: boolean;
  setAuth: (user: IUser | null) => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  setAuth: () => null,
});

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<IUser | null>(null);

  const setAuth = (data: IUser | null) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setAuth }} {...props} />
  );
};

export const useAuth = () => useContext(AuthContext);
