import { useQuery } from '@tanstack/react-query';

// Mock API function - in a real app, this would be an API call
const fetchDatasets = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    {
      id: 1,
      title: 'Financial Transactions Dataset',
      description: 'Anonymous financial transactions with privacy-preserving features',
      provider: 'FinTech Research Group',
      size: '1.2 GB',
      records: '1.5M',
      price: 'Free',
      tags: ['Finance', 'Transactions', 'Anonymous']
    },
    {
      id: 2,
      title: 'Healthcare Analytics Dataset',
      description: 'Privacy-preserving medical records for research purposes',
      provider: 'MedTech Labs',
      size: '3.4 GB',
      records: '500K',
      price: '$199',
      tags: ['Healthcare', 'Medical', 'Research']
    },
    {
      id: 3,
      title: 'Retail Customer Behavior',
      description: 'Anonymized customer purchasing patterns and behavior',
      provider: 'Retail Insights',
      size: '2.1 GB',
      records: '2.3M',
      price: '$149',
      tags: ['Retail', 'Customer', 'Behavior']
    },
    {
      id: 4,
      title: 'Transportation Network Data',
      description: 'Urban transportation patterns with privacy guarantees',
      provider: 'Smart City Initiative',
      size: '4.5 GB',
      records: '3.2M',
      price: 'Free',
      tags: ['Transportation', 'Urban', 'Network']
    },
    {
      id: 5,
      title: 'Social Media Engagement',
      description: 'Anonymous social media engagement metrics and patterns',
      provider: 'Digital Analytics Corp',
      size: '5.7 GB',
      records: '10M',
      price: '$299',
      tags: ['Social Media', 'Engagement', 'Analytics']
    },
    {
      id: 6,
      title: 'IoT Sensor Readings',
      description: 'Privacy-protected IoT sensor data from smart devices',
      provider: 'IoT Research Foundation',
      size: '8.3 GB',
      records: '15M',
      price: '$249',
      tags: ['IoT', 'Sensors', 'Smart Devices']
    }
  ];
};

export function useDatasets() {
  return useQuery({
    queryKey: ['datasets'],
    queryFn: fetchDatasets,
  });
}

export function useDataset(id: number) {
  return useQuery({
    queryKey: ['dataset', id],
    queryFn: async () => {
      const datasets = await fetchDatasets();
      const dataset = datasets.find(d => d.id === id);
      
      if (!dataset) {
        throw new Error(`Dataset with id ${id} not found`);
      }
      
      return dataset;
    },
  });
} 