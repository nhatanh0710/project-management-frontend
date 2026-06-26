'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  getUser,
  removeUser,
} from '@/utils/auth';

interface AuthContextType {
  user: any;

  loading: boolean;

  refreshUser: () => void;

  logout: () => void;
}

const AuthContext =
  createContext<AuthContextType | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const refreshUser = () => {
    const currentUser = getUser();

    setUser(currentUser);
  };

  const logout = () => {
    localStorage.removeItem('token');

    removeUser?.();

    setUser(null);

    window.location.href = '/login';
  };

  useEffect(() => {
    refreshUser();

    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider',
    );
  }

  return context;
}