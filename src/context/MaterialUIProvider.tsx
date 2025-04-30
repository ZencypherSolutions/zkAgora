"use client";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ReactNode, createContext, useContext, useMemo, useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';

// Create a context for theme mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

// Theme colors for a professional research app
const getDesignTokens = (mode: 'light' | 'dark') => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#0057B7',
            light: '#3F7DD6',
            dark: '#004090',
            contrastText: '#fff',
          },
          secondary: {
            main: '#6B4DE6',
            light: '#8A72EB',
            dark: '#4F37AC',
            contrastText: '#fff',
          },
          background: {
            default: '#F8F9FC',
            paper: '#FFFFFF',
          },
          text: {
            primary: '#1A2027',
            secondary: '#637381',
          },
        }
      : {
          // Dark mode
          primary: {
            main: '#3F7DD6',
            light: '#6F9DE6',
            dark: '#0057B7',
            contrastText: '#fff',
          },
          secondary: {
            main: '#8A72EB',
            light: '#A594EF',
            dark: '#6B4DE6',
            contrastText: '#fff',
          },
          background: {
            default: '#161C24',
            paper: '#212B36',
          },
          text: {
            primary: '#FFFFFF',
            secondary: '#919EAB',
          },
        }),
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none' as 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.05)',
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

interface MaterialUIProviderProps {
  children: ReactNode;
}

export function MaterialUIProvider({ children }: MaterialUIProviderProps) {
  // Use system preference as default
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  
  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  // Synchronize with system preference changes
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Custom hook to use the theme toggle
export const useColorMode = () => useContext(ColorModeContext); 