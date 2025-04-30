"use client";

import { Box } from '@mui/material';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { MaterialUIProvider } from '../../context/MaterialUIProvider';

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <MaterialUIProvider>
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          flexDirection: 'column' 
        }}
      >
        <Navbar />
        <Box 
          component="main" 
          sx={{ 
            flex: 1, 
            py: 4
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </MaterialUIProvider>
  );
} 