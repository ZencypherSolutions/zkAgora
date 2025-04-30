"use client";

import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Container,
  useTheme
} from '@mui/material';
import Link from 'next/link';
import { useColorMode } from '../../context/MaterialUIProvider';

export function Navbar() {
  const theme = useTheme();
  const colorMode = useColorMode();
  const isDarkMode = colorMode.mode === 'dark';
  
  return (
    <AppBar 
      position="static" 
      color="default" 
      elevation={0}
      sx={{ 
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 'bold', cursor: 'pointer' }}
          >
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              ZK AGORA
            </Link>
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Link href="/datasets" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Datasets</Button>
            </Link>
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Button color="inherit">About</Button>
            </Link>
            <IconButton 
              onClick={colorMode.toggleColorMode} 
              color="inherit"
              aria-label="Toggle color mode"
              sx={{ ml: 1 }}
            >
              <SunIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// Simple icon components
function SunIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
        fill="currentColor"
      />
      <path d="M12 0V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12 22V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M0 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 12L24 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2256 21.9982C12.1501 21.9994 12.0745 22 11.9987 22C11.9229 22 11.8473 21.9994 11.7718 21.9982C7.24797 21.8891 3.11801 18.4751 2.19606 13.8913C1.31786 9.54475 3.55298 5.08234 7.07635 3.32343C7.44368 3.14803 7.87678 3.3027 8.05217 3.67002C8.22757 4.03734 8.0729 4.47044 7.70558 4.64584C4.77429 6.1127 2.87295 9.85348 3.61538 13.5538C4.36562 17.3041 7.62604 20.1238 11.7688 20.9992C15.3833 20.9362 18.4839 18.9579 20.0197 16.0145C21.4394 13.2811 21.3753 9.9061 19.4817 7.26824C19.2687 6.92093 19.3754 6.46984 19.7227 6.25679C20.07 6.04373 20.5211 6.15044 20.7342 6.49775C22.9558 9.60563 23.0322 13.5859 21.3665 16.7951C19.5695 20.2137 15.9539 22.5791 11.9987 22C12.0744 22 12.15 21.9994 12.2256 21.9982Z"
        fill="currentColor"
      />
    </svg>
  );
} 