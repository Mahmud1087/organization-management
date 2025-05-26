import React from 'react';
import type { GenericAuthDataReturnType } from '@/types';
import { USER_DATA } from '@/config/app';

export type AuthContextType = {
  auth: boolean;
  data: GenericAuthDataReturnType | null;
  loading: boolean;
  login: (data: GenericAuthDataReturnType) => void;
  logout: () => void;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const getAuthData = (): GenericAuthDataReturnType | null => {
  const stored = localStorage.getItem(USER_DATA);
  return stored ? JSON.parse(stored) : null;
};

const clearAuthData = () => {
  localStorage.removeItem(USER_DATA);
};

const initialState = {
  loading: true,
  auth: false,
  data: null,
};

type ReducerStateType = Omit<AuthContextType, 'login' | 'logout'>;

const reducer = (
  state: ReducerStateType,
  action:
    | { payload: GenericAuthDataReturnType; type: 'login' }
    | { type: 'logout' }
) => {
  switch (action.type) {
    case 'login':
      return {
        loading: false,
        auth: true,
        data: action.payload,
      };
    case 'logout':
      return {
        loading: false,
        auth: false,
        data: null,
      };
    default:
      return state;
  }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    const stored = getAuthData();
    if (stored) {
      dispatch({ type: 'login', payload: stored });
    } else {
      dispatch({ type: 'logout' });
    }
  }, []);

  const login = React.useCallback((userData: GenericAuthDataReturnType) => {
    // saveAuthData(userData);
    dispatch({ type: 'login', payload: userData });
  }, []);

  const logout = React.useCallback(() => {
    clearAuthData();
    dispatch({ type: 'logout' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
