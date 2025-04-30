"use client";

import { ReactNode } from 'react';
import { MaterialUIProvider } from './MaterialUIProvider';
import { QueryProvider } from './QueryProvider';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <MaterialUIProvider>
      <QueryProvider>
        {children}
      </QueryProvider>
    </MaterialUIProvider>
  );
} 