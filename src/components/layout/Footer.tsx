"use client";

import { Box, Container, Typography, Link as MuiLink, Stack } from '@mui/material';

export function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{
        py: 5,
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="xl">
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          justifyContent="space-between" 
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} ZK Dataset Marketplace. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={3}>
            <MuiLink href="/terms" color="inherit" underline="hover">Terms</MuiLink>
            <MuiLink href="/privacy" color="inherit" underline="hover">Privacy</MuiLink>
            <MuiLink href="/contact" color="inherit" underline="hover">Contact</MuiLink>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
} 