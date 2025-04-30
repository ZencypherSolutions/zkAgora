"use client";

import { Container, Typography, Button, Grid, Box, Paper, Card, CardContent, CardMedia, Chip, Avatar, Stack, useTheme } from '@mui/material';
import Link from 'next/link';
import { MainLayout } from '../components/layout/MainLayout';
import Image from 'next/image';
import { DatasetCard, DatasetCardProps } from '../components/ui/DatasetCard';

// Icons imports
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DevicesIcon from '@mui/icons-material/Devices';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BarChartIcon from '@mui/icons-material/BarChart';
import SchoolIcon from '@mui/icons-material/School';

// Sample featured datasets
const featuredDatasets: DatasetCardProps[] = [
  {
    id: '1',
    title: 'Census Demographics (Anonymized)',
    description: 'Population demographics with privacy-preserving transformations applied. Includes age distributions, income brackets, education levels.',
    provider: {
      name: 'National Statistics Office',
      avatar: '/avatars/nso.png',
      verified: true,
    },
    previewImage: '/dataset-previews/demographics.png',
    verifications: [
      { type: 'identity' as const, verified: true },
      { type: 'integrity' as const, verified: true },
      { type: 'privacy' as const, verified: true },
    ],
    stats: {
      size: '1.2 GB',
      format: 'CSV, JSON',
      lastUpdated: 'June 15, 2023',
      records: 350000,
    },
    tags: ['demographics', 'census'],
    price: 299,
    isFree: false,
  },
  {
    id: '2',
    title: 'Medical Research Dataset',
    description: 'Anonymized clinical trial data for diabetes research with zero-knowledge proofs ensuring patient privacy.',
    provider: {
      name: 'MedResearch Institute',
      avatar: '/avatars/medresearch.png',
      verified: true,
    },
    previewImage: '/dataset-previews/medical.png',
    verifications: [
      { type: 'identity' as const, verified: true },
      { type: 'integrity' as const, verified: true },
      { type: 'privacy' as const, verified: true },
    ],
    stats: {
      size: '850 MB',
      format: 'FHIR, CSV',
      lastUpdated: 'April 3, 2023',
      records: 12500,
    },
    tags: ['healthcare', 'clinical-trials'],
    price: 499,
    isFree: false,
  },
  {
    id: '3',
    title: 'Financial Transactions Sample',
    description: 'Synthetic financial transaction data modeled after real-world patterns for fraud detection algorithm development.',
    provider: {
      name: 'FinData Solutions',
      avatar: '/avatars/findata.png',
      verified: true,
    },
    previewImage: '/dataset-previews/financial.png',
    verifications: [
      { type: 'identity' as const, verified: true },
      { type: 'integrity' as const, verified: true },
      { type: 'privacy' as const, verified: false },
    ],
    stats: {
      size: '500 MB',
      format: 'JSON, Parquet',
      lastUpdated: 'May 22, 2023',
      records: 1200000,
    },
    tags: ['finance', 'transactions'],
    price: 0,
    isFree: true,
  },
];

// Research domains with icons
const researchDomains = [
  { name: 'Healthcare', icon: <HealthAndSafetyIcon sx={{ fontSize: 40 }} /> },
  { name: 'Finance', icon: <AccountBalanceIcon sx={{ fontSize: 40 }} /> },
  { name: 'IoT', icon: <DevicesIcon sx={{ fontSize: 40 }} /> },
  { name: 'Engineering', icon: <EngineeringIcon sx={{ fontSize: 40 }} /> },
  { name: 'Environmental', icon: <PublicIcon sx={{ fontSize: 40 }} /> },
  { name: 'Education', icon: <SchoolIcon sx={{ fontSize: 40 }} /> },
];

export default function Home() {
  const theme = useTheme();
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <Box 
        sx={{ 
          pt: { xs: 8, md: 12 },
          pb: { xs: 10, md: 14 },
          position: 'relative',
          overflow: 'hidden',
          background: theme => theme.palette.mode === 'dark' 
            ? `linear-gradient(165deg, #0F172A 0%, #1E293B 100%)`
            : `linear-gradient(to bottom right, ${theme.palette.background.paper}, ${theme.palette.primary.light}30)`,
          '&::before': theme => theme.palette.mode === 'dark' ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(37, 99, 235, 0.12) 0%, transparent 45%)',
            zIndex: 1,
          } : {},
          '&::after': theme => theme.palette.mode === 'dark' ? {
            content: '""',
            position: 'absolute',
            top: -80,
            right: -80,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            zIndex: 0,
          } : {},
        }}
      >
        {/* Decorative elements for dark mode */}
        {theme.palette.mode === 'dark' && (
          <>
            <Box sx={{
              position: 'absolute',
              top: '20%',
              left: '5%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'rgba(59, 130, 246, 0.7)',
              boxShadow: '0 0 20px 2px rgba(59, 130, 246, 0.3)',
              zIndex: 2,
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'rgba(37, 99, 235, 0.7)',
              boxShadow: '0 0 15px 2px rgba(37, 99, 235, 0.3)',
              zIndex: 2,
            }} />
            <Box sx={{
              position: 'absolute',
              bottom: '30%',
              left: '45%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: 'rgba(29, 78, 216, 0.7)',
              boxShadow: '0 0 10px 2px rgba(29, 78, 216, 0.3)',
              zIndex: 2,
            }} />
          </>
        )}

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box 
            sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 5,
            }}
          >
            <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#FFFFFF',
                  display: { xs: 'none', md: 'block' }
                }}
              >
                Zero-Knowledge Dataset Marketplace
              </Typography>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  mb: 3, 
                  fontWeight: 700,
                  color: '#FFFFFF',
                  display: { xs: 'block', md: 'none' }
                }}
              >
                Zero-Knowledge Dataset Marketplace
              </Typography>
              <Typography variant="h6" sx={{ 
                mb: 4, 
                lineHeight: 1.6,
                color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.85)' : 'text.secondary'
              }}>
                Discover, share, and utilize datasets with cryptographic verification that preserves privacy
                while ensuring data integrity and scientific reproducibility.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href="/datasets" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    size="large" 
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      background: theme => theme.palette.mode === 'dark' 
                        ? `linear-gradient(to right, #3B82F6, #2563EB)`
                        : theme.palette.primary.main,
                      boxShadow: theme => theme.palette.mode === 'dark' ? '0 4px 20px rgba(37, 99, 235, 0.3)' : '',
                      '&:hover': {
                        background: theme => theme.palette.mode === 'dark' 
                          ? `linear-gradient(to right, #2563EB, #1D4ED8)`
                          : theme.palette.primary.dark,
                        boxShadow: theme => theme.palette.mode === 'dark' ? '0 6px 25px rgba(37, 99, 235, 0.4)' : '',
                      }
                    }}
                  >
                    Explore Datasets
                  </Button>
                </Link>
                <Link href="/about" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    sx={{ 
                      px: 4, 
                      py: 1.5, 
                      borderRadius: 2,
                      borderWidth: 2,
                      color: theme => theme.palette.mode === 'dark' ? '#FFFFFF' : 'primary.main',
                      borderColor: theme => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.6)' : 'primary.main',
                      '&:hover': {
                        borderColor: theme => theme.palette.mode === 'dark' ? '#3B82F6' : 'primary.dark',
                        background: theme => theme.palette.mode === 'dark' ? 'rgba(59, 130, 246, 0.08)' : 'rgba(0,0,0,0.02)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </Link>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 6 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{
                    color: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'text.secondary'
                  }}
                >
                  Trusted by leading research institutions:
                </Typography>
                <Stack 
                  direction="row" 
                  spacing={3} 
                  sx={{ 
                    opacity: theme => theme.palette.mode === 'dark' ? 0.9 : 0.7,
                    color: theme => theme.palette.mode === 'dark' ? '#fff' : 'inherit'
                  }}
                >
                  <Box component="span" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>MIT</Box>
                  <Box component="span" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Stanford</Box>
                  <Box component="span" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>ETH Zurich</Box>
                </Stack>
              </Box>
            </Box>
            
            <Box sx={{ flex: 1, position: 'relative', height: { xs: 300, md: 400 }, width: '100%' }}>
              <Image 
                src="/hero-image.svg" 
                alt="Data visualization with privacy protection" 
                fill
                style={{ 
                  objectFit: 'contain',
                  filter: theme.palette.mode === 'dark' ? 'drop-shadow(0 0 30px rgba(59, 130, 246, 0.25))' : 'none'
                }}
                priority
              />
            </Box>
          </Box>
        </Container>
      </Box>
      
      {/* Featured Datasets Section */}
      <Box sx={{ py: 10, background: theme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" color="primary" fontWeight="bold">
              FEATURED DATASETS
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Verified Research Data
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Explore our curated collection of datasets with cryptographic verification for academic and industrial research.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gap: 4, 
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            }
          }}>
            {featuredDatasets.map(dataset => (
              <Box key={dataset.id} sx={{ width: '100%' }}>
                <DatasetCard {...dataset} />
              </Box>
            ))}
          </Box>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Link href="/datasets" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outlined" 
                color="primary" 
                size="large"
                sx={{ borderRadius: 2 }}
              >
                View All Datasets
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>
      
      {/* Research Domains/Categories Section */}
      <Box sx={{ py: 10, background: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="overline" color="primary" fontWeight="bold">
              RESEARCH DOMAINS
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              Browse by Category
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Our datasets cover a wide range of research domains, each with specific zero-knowledge verification protocols.
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'grid', 
            gap: 3, 
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(6, 1fr)'
            }
          }}>
            {researchDomains.map((domain, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3,
                    bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {domain.icon}
                </Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  {domain.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Browse datasets
                </Typography>
              </Paper>
            ))}
          </Box>
        </Container>
      </Box>
      
      {/* How it Works Section */}
      <Box sx={{ py: 10, background: theme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="overline" color="primary" fontWeight="bold">
              TECHNOLOGY
            </Typography>
            <Typography variant="h4" component="h2" fontWeight="bold" sx={{ mb: 2 }}>
              How Zero-Knowledge Verification Works
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
              Our platform uses cryptographic proofs to verify data integrity and privacy, enabling researchers to trust datasets without compromising sensitive information.
            </Typography>
          </Box>
          
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 5 }}>
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Image 
                src="/zk-illustration.svg" 
                alt="Zero-knowledge proof illustration" 
                width={500}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Box>
            
            <Stack spacing={4}>
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <LockIcon />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Privacy Preservation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Sensitive data remains encrypted while still allowing verification of key properties and analytics, 
                    using advanced cryptographic protocols that reveal nothing about the underlying data.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ 
                  bgcolor: 'secondary.main', 
                  color: 'white', 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <VerifiedUserIcon />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Data Integrity Validation
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Cryptographic proofs verify that data hasn't been tampered with and meets quality standards,
                    ensuring reproducibility for scientific research without revealing raw data.
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Box sx={{ 
                  bgcolor: 'success.main', 
                  color: 'white', 
                  width: 50, 
                  height: 50, 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <BarChartIcon />
                </Box>
                <Box>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Analytics Without Exposure
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Perform statistical analysis, validation, and machine learning on datasets while 
                    maintaining privacy guarantees and regulatory compliance throughout the process.
                  </Typography>
                </Box>
              </Box>
              
              <Link href="/technology" style={{ textDecoration: 'none' }}>
                <Button 
                  variant="text" 
                  color="primary" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    ml: -1,
                    '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
                  }}
                >
                  Learn more about our technology
                </Button>
              </Link>
            </Stack>
          </Box>
        </Container>
      </Box>
    </MainLayout>
  );
} 