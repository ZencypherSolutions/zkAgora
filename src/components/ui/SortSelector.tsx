"use client";

import { useState } from 'react';
import { 
  Box, 
  FormControl, 
  Select, 
  MenuItem, 
  InputLabel, 
  SelectChangeEvent,
  Typography,
  useTheme,
  IconButton,
  Tooltip
} from '@mui/material';
import SortIcon from '@mui/icons-material/Sort';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export type SortOption = 'relevance' | 'newest' | 'oldest' | 'price-low' | 'price-high' | 'popularity';

interface SortSelectorProps {
  value?: SortOption;
  onChange?: (value: SortOption) => void;
  compact?: boolean;
}

export function SortSelector({ value = 'relevance', onChange, compact = false }: SortSelectorProps) {
  const [sortBy, setSortBy] = useState<SortOption>(value);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent) => {
    const newValue = event.target.value as SortOption;
    setSortBy(newValue);
    
    if (onChange) {
      onChange(newValue);
    }
  };

  const toggleDirection = () => {
    const newDirection = direction === 'asc' ? 'desc' : 'asc';
    setDirection(newDirection);
    
    // Here you could also update the sort value to reflect direction if needed
  };

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'popularity', label: 'Popularity' },
  ];

  if (compact) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <SortIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
        <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
          <Select
            value={sortBy}
            onChange={handleChange}
            displayEmpty
            sx={{ 
              height: 36,
              '& .MuiSelect-select': { 
                py: 0.5,
                fontSize: '0.875rem'
              }
            }}
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={direction === 'asc' ? 'Ascending' : 'Descending'}>
          <IconButton 
            size="small" 
            onClick={toggleDirection}
            sx={{ ml: 0.5 }}
          >
            {direction === 'asc' ? 
              <ArrowUpwardIcon fontSize="small" /> : 
              <ArrowDownwardIcon fontSize="small" />
            }
          </IconButton>
        </Tooltip>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Sort By
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControl fullWidth variant="outlined" size="small">
          <Select
            value={sortBy}
            onChange={handleChange}
            displayEmpty
          >
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Tooltip title={direction === 'asc' ? 'Ascending' : 'Descending'}>
          <IconButton 
            size="small" 
            onClick={toggleDirection}
            sx={{ ml: 1 }}
          >
            {direction === 'asc' ? 
              <ArrowUpwardIcon fontSize="small" /> : 
              <ArrowDownwardIcon fontSize="small" />
            }
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
} 