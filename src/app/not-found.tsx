"use client";

import { Box, Container, Typography, Button, useTheme, Paper } from '@mui/material';
import { MainLayout } from '../components/layout/MainLayout';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ScienceIcon from '@mui/icons-material/Science';
import { keyframes } from '@mui/system';

// Subtle pulse animation
const pulsate = keyframes`
  0% { opacity: 0.9; }
  50% { opacity: 1; }
  100% { opacity: 0.9; }
`;

export default function NotFound() {
  const theme = useTheme();

  return (
    <MainLayout>
      <Container maxWidth="md">
        <Box 
          sx={{ 
            minHeight: '70vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          {/* Subtle laboratory grid background */}
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage: `
                repeating-linear-gradient(90deg, ${theme.palette.primary.main} 0px, ${theme.palette.primary.main} 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(0deg, ${theme.palette.primary.main} 0px, ${theme.palette.primary.main} 1px, transparent 1px, transparent 40px)
              `,
              zIndex: 0,
            }}
          />
          
          {/* Subtle laboratory circle element */}
          <Box
            sx={{
              position: 'absolute',
              width: 160,
              height: 160,
              borderRadius: '50%',
              border: `1px solid ${theme.palette.primary.main}30`,
              top: '25%',
              right: '20%',
              zIndex: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: `1px dashed ${theme.palette.primary.main}20`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }
            }}
          />
          
          {/* Main Error Content */}
          <Paper 
            elevation={0}
            sx={{ 
              p: { xs: 4, sm: 5 }, 
              borderRadius: 2, 
              textAlign: 'center', 
              position: 'relative',
              maxWidth: 400,
              border: '1px solid',
              borderColor: 'divider',
              background: theme => theme.palette.mode === 'dark' 
                ? 'rgba(30, 41, 59, 0.8)'
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(5px)',
              zIndex: 2,
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 0 20px rgba(0,0,0,0.05)'
              }
            }}
          >
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                mb: 3,
                position: 'relative',
              }}
            >
              <ErrorOutlineIcon 
                color="primary" 
                sx={{ 
                  fontSize: 70,
                  animation: `${pulsate} 4s infinite ease-in-out`
                }} 
              />
              <ScienceIcon 
                sx={{ 
                  fontSize: 28,
                  ml: -1.5,
                  mt: 5,
                  position: 'absolute',
                  right: 'calc(50% - 32px)',
                  bottom: '0px'
                }} 
              />
            </Box>
            
            <Typography 
              variant="h2" 
              component="h1" 
              color="primary"
              sx={{ 
                fontWeight: 700, 
                mb: 2,
                fontFamily: 'monospace',
                letterSpacing: '0.05em'
              }}
            >
              404
            </Typography>
            
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{
                letterSpacing: '0.02em',
                fontWeight: 500
              }}
            >
              Experiment Not Found
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ 
                mb: 4,
                maxWidth: '85%',
                mx: 'auto',
                lineHeight: 1.6
              }}
            >
              The requested data sample could not be located in the laboratory archives.
            </Typography>
            
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.history.back()}
              sx={{ 
                borderRadius: 1.5,
                px: 4,
                py: 1,
                transition: 'all 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }
              }}
            >
              Go Back
            </Button>
          </Paper>
        </Box>
      </Container>
    </MainLayout>
  );
} 