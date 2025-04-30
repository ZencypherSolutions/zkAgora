"use client";

import { Grid, Container, Typography, Box } from '@mui/material';
import { DatasetCard, DatasetCardProps } from './DatasetCard';

// Sample dataset data
const sampleDatasets: DatasetCardProps[] = [
  {
    id: '1',
    title: 'Census Demographics (Anonymized)',
    description: 'Population demographics with privacy-preserving transformations applied. Includes age distributions, income brackets, education levels, and geographic data with differential privacy guarantees.',
    provider: {
      name: 'National Statistics Office',
      avatar: '/avatars/nso.png',
      verified: true,
    },
    previewImage: '/dataset-previews/demographics.png',
    verifications: [
      { type: 'identity', verified: true },
      { type: 'integrity', verified: true },
      { type: 'privacy', verified: true },
      { type: 'compliance', verified: true },
    ],
    stats: {
      size: '1.2 GB',
      format: 'CSV, JSON',
      lastUpdated: 'June 15, 2023',
      records: 350000,
    },
    tags: ['demographics', 'census', 'privacy-preserved', 'statistical'],
    price: 299,
    isFree: false,
  },
  {
    id: '2',
    title: 'Medical Research Dataset',
    description: 'Anonymized clinical trial data for diabetes research with zero-knowledge proofs ensuring patient privacy while maintaining statistical validity for research purposes.',
    provider: {
      name: 'MedResearch Institute',
      avatar: '/avatars/medresearch.png',
      verified: true,
    },
    previewImage: '/dataset-previews/medical.png',
    verifications: [
      { type: 'identity', verified: true },
      { type: 'integrity', verified: true },
      { type: 'privacy', verified: true },
      { type: 'compliance', verified: false },
    ],
    stats: {
      size: '850 MB',
      format: 'FHIR, CSV',
      lastUpdated: 'April 3, 2023',
      records: 12500,
    },
    tags: ['healthcare', 'clinical-trials', 'diabetes', 'anonymized'],
    price: 499,
    isFree: false,
  },
  {
    id: '3',
    title: 'Financial Transactions Sample',
    description: 'Synthetic financial transaction data modeled after real-world patterns. Ideal for fraud detection algorithm training and financial analysis model development.',
    provider: {
      name: 'FinData Solutions',
      avatar: '/avatars/findata.png',
      verified: true,
    },
    previewImage: '/dataset-previews/financial.png',
    verifications: [
      { type: 'identity', verified: true },
      { type: 'integrity', verified: true },
      { type: 'privacy', verified: false },
      { type: 'compliance', verified: false },
    ],
    stats: {
      size: '500 MB',
      format: 'JSON, Parquet',
      lastUpdated: 'May 22, 2023',
      records: 1200000,
    },
    tags: ['finance', 'transactions', 'synthetic', 'fraud-detection'],
    price: 0,
    isFree: true,
  },
  {
    id: '4',
    title: 'IoT Sensor Readings',
    description: 'Industrial IoT sensor data from manufacturing facilities with privacy-preserving techniques applied to protect proprietary processes while maintaining data utility.',
    provider: {
      name: 'IndustrialTech',
      avatar: '/avatars/industrialtech.png',
      verified: false,
    },
    previewImage: '/dataset-previews/iot.png',
    verifications: [
      { type: 'identity', verified: false },
      { type: 'integrity', verified: true },
      { type: 'privacy', verified: true },
      { type: 'compliance', verified: false },
    ],
    stats: {
      size: '2.5 GB',
      format: 'CSV, Time Series',
      lastUpdated: 'July 8, 2023',
      records: 5000000,
    },
    tags: ['iot', 'manufacturing', 'sensor-data', 'time-series'],
    price: 199,
    isFree: false,
  },
];

interface DatasetListProps {
  title?: string;
  description?: string;
}

export function DatasetList({ title = "Available Datasets", description }: DatasetListProps) {
  return (
    <Container maxWidth="xl">
      {title && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 800 }}>
              {description}
            </Typography>
          )}
        </Box>
      )}
      
      <Box sx={{ display: 'grid', gap: 3, 
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)'
        }
      }}>
        {sampleDatasets.map(dataset => (
          <Box key={dataset.id} sx={{ width: '100%' }}>
            <DatasetCard {...dataset} />
          </Box>
        ))}
      </Box>
    </Container>
  );
} 