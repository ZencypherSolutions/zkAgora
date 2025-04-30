import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zero-Knowledge Dataset Marketplace | ZK-Agora',
  description: 'Discover and access high-quality datasets with privacy-preserving zero-knowledge proofs. Search, filter, and acquire data for research and development.',
  keywords: ['zero-knowledge', 'datasets', 'privacy-preserving', 'research data', 'marketplace', 'cryptographic verification'],
  authors: [{ name: 'ZK-Agora Team' }],
  openGraph: {
    title: 'Zero-Knowledge Dataset Marketplace | ZK-Agora',
    description: 'Discover and access high-quality datasets with privacy-preserving zero-knowledge proofs.',
    url: '/datasets',
    siteName: 'ZK-Agora',
    images: [
      {
        url: '/og-marketplace.jpg',
        width: 1200,
        height: 630,
        alt: 'ZK-Agora Dataset Marketplace'
      }
    ],
    type: 'website'
  }
}; 