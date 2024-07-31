import React from 'react';
import { AuthProvider } from './AuthContext';
import { SocketProvider } from './SocketContext';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        {children}
      </SocketProvider>
    </AuthProvider>
  );
};

export default AppProviders;