import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  user: { id: string; token: string } | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = (props: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ id: string; token: string } | null>(null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      console.log(response)
      const { id, accessToken } = response.data;
      setUser({ id, token: accessToken });
      localStorage.setItem('token', accessToken);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };
  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', { username, password });
      const { id, accessToken } = response.data;
      localStorage.setItem('authToken', accessToken);
      setUser({ id, token: accessToken });
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  useEffect(() => {

    const token = localStorage.getItem('token');
    if (token) {
      setUser({ id: '', token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {props.children}
    </AuthContext.Provider>
  );
};