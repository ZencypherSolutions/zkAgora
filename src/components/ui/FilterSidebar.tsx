"use client";

import { useState, useCallback, useMemo } from 'react';
import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Button,
  Chip,
  IconButton,
  Drawer,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FilterListIcon from '@mui/icons-material/FilterList';
import ClearIcon from '@mui/icons-material/Clear';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// Define the filter categories and options
const verificationTypes = [
  { id: 'identity', label: 'Identity Verified' },
  { id: 'integrity', label: 'Data Integrity' },
  { id: 'privacy', label: 'Privacy Preserving' },
  { id: 'compliance', label: 'Regulatory Compliant' },
];

const categories = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'finance', label: 'Finance' },
  { id: 'iot', label: 'IoT & Sensors' },
  { id: 'demographics', label: 'Demographics' },
  { id: 'environmental', label: 'Environmental' },
  { id: 'education', label: 'Education' },
];

const formats = [
  { id: 'csv', label: 'CSV' },
  { id: 'json', label: 'JSON' },
  { id: 'parquet', label: 'Parquet' },
  { id: 'fhir', label: 'FHIR' },
  { id: 'timeseries', label: 'Time Series' },
];

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  initialFilters?: Partial<FilterState>;
}

interface FilterState {
  verifications: string[];
  categories: string[];
  formats: string[];
  priceRange: [number, number];
  freeOnly: boolean;
  minRecords: number;
}

export function FilterSidebar({ 
  onFilterChange = () => {}, 
  initialFilters 
}: FilterSidebarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedPanel, setExpandedPanel] = useState<string>('verification');
  
  const [filters, setFilters] = useState<FilterState>({
    verifications: initialFilters?.verifications || [],
    categories: initialFilters?.categories || [],
    formats: initialFilters?.formats || [],
    priceRange: initialFilters?.priceRange || [0, 1000],
    freeOnly: initialFilters?.freeOnly || false,
    minRecords: initialFilters?.minRecords || 0
  });
  
  // Calculate active filters count with useMemo for performance
  const activeFiltersCount = useMemo(() => {
    return filters.verifications.length + 
           filters.categories.length + 
           filters.formats.length + 
           (filters.freeOnly ? 1 : 0) + 
           (filters.minRecords > 0 ? 1 : 0) + 
           (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000 ? 1 : 0);
  }, [filters]);
  
  // Create a list of active filter chips for display
  const activeFilterChips = useMemo(() => {
    const chips = [];
    
    // Add verification chips
    filters.verifications.forEach(v => {
      const item = verificationTypes.find(type => type.id === v);
      if (item) {
        chips.push({
          id: `verification-${v}`,
          label: item.label,
          category: 'verifications',
          value: v
        });
      }
    });
    
    // Add category chips
    filters.categories.forEach(c => {
      const item = categories.find(cat => cat.id === c);
      if (item) {
        chips.push({
          id: `category-${c}`,
          label: item.label,
          category: 'categories',
          value: c
        });
      }
    });
    
    // Add format chips
    filters.formats.forEach(f => {
      const item = formats.find(format => format.id === f);
      if (item) {
        chips.push({
          id: `format-${f}`,
          label: item.label,
          category: 'formats',
          value: f
        });
      }
    });
    
    // Add price range chip if modified
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      chips.push({
        id: 'price-range',
        label: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
        category: 'price',
        value: 'price-range'
      });
    }
    
    // Add free only chip
    if (filters.freeOnly) {
      chips.push({
        id: 'free-only',
        label: 'Free Only',
        category: 'price',
        value: 'free-only'
      });
    }
    
    // Add min records chip if set
    if (filters.minRecords > 0) {
      chips.push({
        id: 'min-records',
        label: `Min ${filters.minRecords.toLocaleString()} Records`,
        category: 'records',
        value: 'min-records'
      });
    }
    
    return chips;
  }, [filters]);
  
  const handleToggleMobile = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleExpandPanel = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedPanel(isExpanded ? panel : '');
  };
  
  const handleCheckboxChange = useCallback((category: 'verifications' | 'categories' | 'formats', id: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (updatedFilters[category].includes(id)) {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== id);
      } else {
        updatedFilters[category] = [...updatedFilters[category], id];
      }
      
      // Delay update to improve performance
      setTimeout(() => onFilterChange(updatedFilters), 0);
      return updatedFilters;
    });
  }, [onFilterChange]);
  
  const handleFreeOnlyChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => {
      const updatedFilters = { 
        ...prev, 
        freeOnly: event.target.checked 
      };
      
      setTimeout(() => onFilterChange(updatedFilters), 0);
      return updatedFilters;
    });
  }, [onFilterChange]);
  
  const handlePriceRangeChange = useCallback((event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setFilters(prev => {
      const updatedFilters = { 
        ...prev, 
        priceRange: newValue as [number, number] 
      };
      
      // Only update when slider stops changing
      if (event.type === 'mouseup' || event.type === 'touchend') {
        setTimeout(() => onFilterChange(updatedFilters), 0);
      }
      return updatedFilters;
    });
  }, [onFilterChange]);
  
  const handleMinRecordsChange = useCallback((event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setFilters(prev => {
      const updatedFilters = { 
        ...prev, 
        minRecords: newValue as number 
      };
      
      // Only update when slider stops changing
      if (event.type === 'mouseup' || event.type === 'touchend') {
        setTimeout(() => onFilterChange(updatedFilters), 0);
      }
      return updatedFilters;
    });
  }, [onFilterChange]);
  
  const clearAllFilters = useCallback(() => {
    const clearedFilters: FilterState = {
      verifications: [],
      categories: [],
      formats: [],
      priceRange: [0, 1000] as [number, number],
      freeOnly: false,
      minRecords: 0
    };
    
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  }, [onFilterChange]);
  
  const removeFilter = useCallback((category: string, value: string) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (category === 'verifications' || category === 'categories' || category === 'formats') {
        updatedFilters[category] = updatedFilters[category].filter(item => item !== value);
      } else if (category === 'price' && value === 'free-only') {
        updatedFilters.freeOnly = false;
      } else if (category === 'price' && value === 'price-range') {
        updatedFilters.priceRange = [0, 1000] as [number, number];
      } else if (category === 'records' && value === 'min-records') {
        updatedFilters.minRecords = 0;
      }
      
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  }, [onFilterChange]);
  
  const renderFilterContent = () => (
    <Box sx={{ 
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Filters
          {activeFiltersCount > 0 && (
            <Chip 
              size="small" 
              color="primary" 
              label={activeFiltersCount} 
              sx={{ ml: 1, fontSize: '0.75rem', height: 20 }} 
            />
          )}
        </Typography>
        {activeFiltersCount > 0 && (
          <Button 
            size="small" 
            color="primary" 
            onClick={clearAllFilters}
            startIcon={<ClearIcon fontSize="small" />}
            sx={{ fontWeight: 500 }}
          >
            Clear All
          </Button>
        )}
      </Box>
      
      <Divider sx={{ mb: 2 }} />
      
      <Box sx={{ overflowY: 'auto', flex: 1, pr: 1, mr: -1 }}>
        <Accordion 
          expanded={expandedPanel === 'verification'} 
          onChange={handleExpandPanel('verification')}
          disableGutters
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': { 
              minHeight: 42, 
              p: 0,
              pl: 2,
              pr: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 1 }}
          >
            <Typography fontWeight="medium">Verification Types</Typography>
            {filters.verifications.length > 0 && (
              <Chip 
                size="small" 
                label={filters.verifications.length}
                color="primary"
                sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.7rem' }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pt: 1, pl: 1 }}>
            <FormGroup>
              {verificationTypes.map((type) => (
                <FormControlLabel
                  key={type.id}
                  control={
                    <Checkbox 
                      size="small"
                      checked={filters.verifications.includes(type.id)}
                      onChange={() => handleCheckboxChange('verifications', type.id)}
                      color="primary"
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{type.label}</Typography>
                      {filters.verifications.includes(type.id) && (
                        <CheckIcon 
                          color="primary" 
                          fontSize="small" 
                          sx={{ ml: 0.5, fontSize: 16, opacity: 0.8 }} 
                        />
                      )}
                    </Box>
                  }
                  sx={{ mb: 0.5 }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        
        <Accordion 
          expanded={expandedPanel === 'categories'} 
          onChange={handleExpandPanel('categories')}
          disableGutters
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': { 
              minHeight: 42, 
              p: 0,
              pl: 2,
              pr: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 1 }}
          >
            <Typography fontWeight="medium">Categories</Typography>
            {filters.categories.length > 0 && (
              <Chip 
                size="small" 
                label={filters.categories.length}
                color="primary"
                sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.7rem' }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pt: 1, pl: 1 }}>
            <FormGroup>
              {categories.map((category) => (
                <FormControlLabel
                  key={category.id}
                  control={
                    <Checkbox 
                      size="small"
                      checked={filters.categories.includes(category.id)}
                      onChange={() => handleCheckboxChange('categories', category.id)}
                      color="primary"
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{category.label}</Typography>
                      {filters.categories.includes(category.id) && (
                        <CheckIcon 
                          color="primary" 
                          fontSize="small" 
                          sx={{ ml: 0.5, fontSize: 16, opacity: 0.8 }} 
                        />
                      )}
                    </Box>
                  }
                  sx={{ mb: 0.5 }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        
        <Accordion 
          expanded={expandedPanel === 'formats'} 
          onChange={handleExpandPanel('formats')}
          disableGutters
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': { 
              minHeight: 42, 
              p: 0,
              pl: 2,
              pr: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 1 }}
          >
            <Typography fontWeight="medium">File Formats</Typography>
            {filters.formats.length > 0 && (
              <Chip 
                size="small" 
                label={filters.formats.length}
                color="primary"
                sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.7rem' }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0, pt: 1, pl: 1 }}>
            <FormGroup>
              {formats.map((format) => (
                <FormControlLabel
                  key={format.id}
                  control={
                    <Checkbox 
                      size="small"
                      checked={filters.formats.includes(format.id)}
                      onChange={() => handleCheckboxChange('formats', format.id)}
                      color="primary"
                      sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2">{format.label}</Typography>
                      {filters.formats.includes(format.id) && (
                        <CheckIcon 
                          color="primary" 
                          fontSize="small" 
                          sx={{ ml: 0.5, fontSize: 16, opacity: 0.8 }} 
                        />
                      )}
                    </Box>
                  }
                  sx={{ mb: 0.5 }}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        
        <Accordion 
          expanded={expandedPanel === 'price'} 
          onChange={handleExpandPanel('price')}
          disableGutters
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': { 
              minHeight: 42, 
              p: 0,
              pl: 2,
              pr: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 1 }}
          >
            <Typography fontWeight="medium">Price Range</Typography>
            {(filters.freeOnly || filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
              <Chip 
                size="small" 
                label="Active"
                color="primary"
                sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.7rem' }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2, pb: 1, px: 1 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  size="small"
                  checked={filters.freeOnly}
                  onChange={handleFreeOnlyChange}
                  color="primary"
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }}
                />
              }
              label={<Typography variant="body2">Free datasets only</Typography>}
            />
            
            {!filters.freeOnly && (
              <Box sx={{ px: 1, pt: 2 }}>
                <Slider
                  value={filters.priceRange}
                  onChange={handlePriceRangeChange}
                  onChangeCommitted={handlePriceRangeChange}
                  valueLabelDisplay="auto"
                  min={0}
                  max={1000}
                  step={10}
                  valueLabelFormat={(value) => `$${value}`}
                  sx={{ 
                    color: 'primary.main',
                    '& .MuiSlider-thumb': {
                      width: 14,
                      height: 14,
                      transition: 'transform 0.1s',
                      '&:hover': {
                        transform: 'scale(1.1)',
                      },
                    },
                    '& .MuiSlider-rail': {
                      opacity: 0.3,
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">$0</Typography>
                  <Typography variant="caption" color="text.secondary">$1000+</Typography>
                </Box>
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
        
        <Accordion 
          expanded={expandedPanel === 'records'} 
          onChange={handleExpandPanel('records')}
          disableGutters
          elevation={0}
          sx={{ 
            bgcolor: 'transparent',
            '&:before': { display: 'none' },
            '& .MuiAccordionSummary-root': { 
              minHeight: 42, 
              p: 0,
              pl: 2,
              pr: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' }
            }
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 1 }}
          >
            <Typography fontWeight="medium">Data Size</Typography>
            {filters.minRecords > 0 && (
              <Chip 
                size="small" 
                label="Active"
                color="primary"
                sx={{ ml: 1, height: 20, minWidth: 20, fontSize: '0.7rem' }}
              />
            )}
          </AccordionSummary>
          <AccordionDetails sx={{ pt: 2, pb: 1, px: 1 }}>
            <Typography variant="body2" gutterBottom>
              Minimum records
            </Typography>
            <Box sx={{ px: 1 }}>
              <Slider
                value={filters.minRecords}
                onChange={handleMinRecordsChange}
                onChangeCommitted={handleMinRecordsChange}
                valueLabelDisplay="auto"
                min={0}
                max={1000000}
                step={1000}
                valueLabelFormat={(value) => `${value.toLocaleString()}`}
                sx={{ 
                  color: 'primary.main',
                  '& .MuiSlider-thumb': {
                    width: 14,
                    height: 14,
                    transition: 'transform 0.1s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                    },
                  },
                  '& .MuiSlider-rail': {
                    opacity: 0.3,
                  }
                }}
                marks={[
                  { value: 0, label: '0' },
                  { value: 250000, label: '250K' },
                  { value: 500000, label: '500K' },
                  { value: 750000, label: '750K' },
                  { value: 1000000, label: '1M+' },
                ]}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
  
  // Mobile filter button
  const filterButton = isMobile && (
    <Button
      variant="contained"
      color="primary"
      onClick={handleToggleMobile}
      startIcon={<FilterListIcon />}
      sx={{ 
        mb: 2, 
        borderRadius: 6,
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 999,
        boxShadow: 3,
        px: 2,
        py: 1,
        '&:hover': {
          boxShadow: 4
        }
      }}
    >
      Filters
      {activeFiltersCount > 0 && (
        <Chip 
          size="small" 
          color="info" 
          label={activeFiltersCount} 
          sx={{ ml: 1, fontSize: '0.75rem', height: 20 }} 
        />
      )}
    </Button>
  );
  
  return (
    <>
      {/* Desktop version */}
      {!isMobile && (
        <Paper
          elevation={0}
          sx={{
            width: 280,
            flexShrink: 0,
            borderRight: '1px solid',
            borderColor: 'divider',
            height: '100%',
            overflowY: 'auto',
            bgcolor: 'background.default'
          }}
        >
          {renderFilterContent()}
        </Paper>
      )}
      
      {/* Mobile version */}
      {isMobile && (
        <>
          {filterButton}
          <Drawer
            anchor="right"
            open={mobileOpen}
            onClose={handleToggleMobile}
            ModalProps={{ keepMounted: true }}
            sx={{
              '& .MuiDrawer-paper': { 
                width: '85%',
                maxWidth: 320,
                transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
              },
            }}
          >
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              height: '100%' 
            }}>
              {renderFilterContent()}
              <Box sx={{ 
                p: 2, 
                borderTop: '1px solid', 
                borderColor: 'divider',
                bgcolor: theme.palette.background.paper 
              }}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  onClick={handleToggleMobile}
                  sx={{ 
                    borderRadius: 2,
                    py: 1,
                    fontWeight: 'medium'
                  }}
                >
                  Apply {activeFiltersCount > 0 ? `${activeFiltersCount} Filters` : 'Filters'}
                </Button>
              </Box>
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
} 