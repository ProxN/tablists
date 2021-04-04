import React, { createContext, useContext, useState } from 'react';
import { IUser } from '../types/entities';

interface AuthState {
  user?: IUser;
  isAuthenticated: boolean;
  setAuth: (user: IUser) => void;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  setAuth: () => null,
});

export const AuthProvider: React.FC = (props) => {
  const [user, setUser] = useState<IUser>();

  const setAuth = (data: IUser) => {
    setUser(data);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, setAuth }} {...props} />
  );
};

export const useAuth = () => useContext(AuthContext);
