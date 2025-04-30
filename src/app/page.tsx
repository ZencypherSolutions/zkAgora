import { Container, Typography, Button, Grid, Box, Paper } from '@mui/material';
import Link from 'next/link';
import { MainLayout } from '../components/layout/MainLayout';
import Image from 'next/image';

export default function Home() {
  return (
    <MainLayout>
      <Container maxWidth="xl">
        {/* Hero Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 5,
            mb: 10
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant="h3" component="h1" sx={{ mb: 2 }}>
              Zero-Knowledge Dataset Marketplace
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Discover, share, and utilize datasets with privacy-preserving zero-knowledge technology
            </Typography>
            <Link href="/datasets" style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" size="large">
                Explore Datasets
              </Button>
            </Link>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Image 
              src="/hero-image.svg" 
              alt="Data visualization" 
              width={500}
              height={400}
            />
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 10 }}>
          <Typography variant="h4" component="h2" align="center" sx={{ mb: 5 }}>
            Why Choose Our Platform?
          </Typography>
          <Grid container spacing={5}>
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
              <FeatureCard 
                title="Privacy-Preserving" 
                description="All datasets leverage zero-knowledge proofs to ensure data privacy while maintaining utility."
              />
            </Grid>
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
              <FeatureCard 
                title="Secure Marketplace" 
                description="Transparent, secure, and fair marketplace for data scientists and providers."
              />
            </Grid>
            <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
              <FeatureCard 
                title="Advanced Analytics" 
                description="Run analytics and machine learning on privacy-protected datasets."
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
}

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 4, 
        borderRadius: 2, 
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
} 