"use client";

import { useState } from "react";
import { Box, Container, Typography, Paper, useMediaQuery, useTheme, Divider, Breadcrumbs, Link as MuiLink, Chip, Tooltip, Accordion, AccordionSummary, AccordionDetails, Button } from "@mui/material";
import { DatasetList } from "../../components/ui/DatasetList";
import { MainLayout } from "../../components/layout/MainLayout";
import { SearchBar } from "../../components/ui/SearchBar";
import { FilterSidebar } from "../../components/ui/FilterSidebar";
import { SortSelector, SortOption } from "../../components/ui/SortSelector";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import StorageIcon from '@mui/icons-material/Storage';
import StarIcon from '@mui/icons-material/Star';
import VerifiedIcon from '@mui/icons-material/Verified';
import ScienceIcon from '@mui/icons-material/Science';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SchoolIcon from '@mui/icons-material/School';
import Link from "next/link";

export default function DatasetMarketplacePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('relevance');
  const [activeFilters, setActiveFilters] = useState({
    verifications: [],
    categories: [],
    formats: [],
    priceRange: [0, 1000] as [number, number],
    freeOnly: false,
    minRecords: 0
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Here you would typically fetch datasets based on the search query
    console.log(`Searching for: ${query}`);
  };

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
    // Here you would typically fetch datasets based on the filters
    console.log("Filters applied:", filters);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    // Here you would typically re-sort the datasets
    console.log(`Sort changed to: ${option}`);
  };

  return (
    <MainLayout>
      <Container maxWidth="xl">
        {/* Breadcrumbs navigation */}
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <MuiLink 
            component={Link} 
            href="/" 
            color="inherit" 
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            Home
          </MuiLink>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <StorageIcon sx={{ mr: 0.5 }} fontSize="small" />
            Dataset Marketplace
          </Typography>
        </Breadcrumbs>

        {/* Page header with search */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Zero-Knowledge Dataset Marketplace
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 900 }}>
            Explore our curated collection of datasets with privacy-preserving zero-knowledge proofs. 
            Each dataset maintains utility while protecting sensitive information through cryptographic verification.
          </Typography>
          
          {/* Search bar for desktop (hidden on mobile) */}
          {!isMobile && (
            <Box sx={{ maxWidth: 600, mb: 2 }}>
              <SearchBar fullWidth onSearch={handleSearch} />
            </Box>
          )}
        </Box>

        {/* Main content area with filters and datasets */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          {/* Filter sidebar */}
          <FilterSidebar onFilterChange={handleFilterChange} />

          {/* Dataset list with mobile search */}
          <Box sx={{ 
            flexGrow: 1, 
            ml: { md: 3 },
            width: { xs: '100%', md: 'calc(100% - 300px)' }
          }}>
            {/* Search bar for mobile (only shown on mobile) */}
            {isMobile && (
              <Box sx={{ mb: 3 }}>
                <SearchBar fullWidth onSearch={handleSearch} />
              </Box>
            )}

            {/* Research focus banner */}
            <Paper
              elevation={0}
              sx={{
                p: 2,
                mb: 3,
                borderRadius: 2,
                backgroundImage: theme => `linear-gradient(to right, ${theme.palette.primary.main}20, ${theme.palette.primary.main}10)`,
                border: '1px solid',
                borderColor: 'primary.light',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <ScienceIcon color="primary" fontSize={isMobile ? "medium" : "large"} />
              <Box>
                <Typography variant="subtitle1" fontWeight="medium">
                  Academic Research Focus
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All datasets include research citations and methodology documentation
                </Typography>
              </Box>
              <Button 
                variant="outlined" 
                color="primary" 
                size="small" 
                sx={{ ml: 'auto', borderRadius: 2, display: { xs: 'none', sm: 'block' } }}
              >
                Research Guide
              </Button>
            </Paper>

            {/* Results summary and sort */}
            <Paper 
              elevation={0} 
              sx={{ 
                p: 2, 
                mb: 3, 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary">
                  {searchQuery ? (
                    <>Showing results for <strong>{searchQuery}</strong></>
                  ) : (
                    "Showing all datasets"
                  )}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  4 results
                </Typography>
              </Box>
              
              <SortSelector 
                value={sortOption} 
                onChange={handleSortChange}
                compact
              />
            </Paper>

            {/* Dataset grid */}
            <DatasetList 
              title="" 
              description="" 
            />
          </Box>
        </Box>

        {/* FAQ Section */}
        <Box sx={{ mt: 16, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <HelpOutlineIcon sx={{ mr: 1 }} color="primary" />
            <Typography variant="h5" fontWeight="bold">
              Frequently Asked Questions
            </Typography>
          </Box>
          
          <Box>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">What makes these datasets different from regular ones?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Our datasets incorporate zero-knowledge proofs, which allow verification of data integrity and credibility without revealing sensitive information. This cryptographic approach enables privacy-preserving data sharing for research purposes.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">How are datasets verified?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Each dataset undergoes a rigorous verification process including provider identity verification, data integrity checks, privacy preservation validation, and regulatory compliance assessment. These verifications are cryptographically secured using zero-knowledge proofs.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">Can I use these datasets for academic research?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Yes! Our datasets are specifically designed for academic and industrial research. Each dataset includes proper citation information and methodology documentation to support academic publication requirements.
                </Typography>
              </AccordionDetails>
            </Accordion>
            
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography fontWeight="medium">What licensing terms apply to the datasets?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2">
                  Each dataset has its own licensing terms, clearly indicated on its detail page. Many datasets offer academic-friendly licenses with special terms for non-commercial research use. All licensing information is transparently provided.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 4, bgcolor: 'background.paper', p: 3, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <SchoolIcon sx={{ mr: 2, color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h6" fontWeight="medium">Academic Partnership Program</Typography>
              <Typography variant="body2" color="text.secondary">
                If you're from an academic institution, you may qualify for our partnership program with special access to premium datasets.
              </Typography>
            </Box>
            <Button variant="contained" color="primary" sx={{ ml: 'auto', borderRadius: 2, display: { xs: 'none', sm: 'block' } }}>
              Coming Soon
            </Button>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
}