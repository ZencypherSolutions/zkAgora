import { DatasetList } from "../../components/ui/DatasetList";
import { MainLayout } from "../../components/layout/MainLayout";

export const metadata = {
  title: 'Zero-Knowledge Datasets | ZK-Agora',
  description: 'Explore our curated collection of datasets with privacy-preserving zero-knowledge proofs.'
};

export default function DatasetsPage() {
  return (
    <MainLayout>
      <DatasetList 
        title="Zero-Knowledge Datasets"
        description="Explore our curated collection of datasets with privacy-preserving zero-knowledge proofs. Each dataset maintains utility while protecting sensitive information through cryptographic verification."
      />
    </MainLayout>
  );
} 