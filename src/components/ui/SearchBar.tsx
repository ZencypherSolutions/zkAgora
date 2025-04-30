"use client";

import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  InputBase, 
  IconButton, 
  Paper, 
  Popper, 
  Grow, 
  ClickAwayListener, 
  MenuList, 
  MenuItem,
  Divider,
  Typography,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  fullWidth?: boolean;
}

export function SearchBar({ 
  onSearch = () => {}, 
  placeholder = "Search datasets...",
  fullWidth = false
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleSearchFocus = () => {
    setIsExpanded(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery.trim() === '') {
      setIsExpanded(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setIsExpanded(false);
  };

  const handleToggleFilters = () => {
    setFiltersOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setFiltersOpen(false);
  };

  return (
    <Box sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <Box ref={searchRef}>
        <Paper
          elevation={isExpanded ? 3 : 1}
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: isExpanded ? (fullWidth ? '100%' : '350px') : (fullWidth ? '100%' : '240px'),
            borderRadius: '24px',
            py: 0.5,
            px: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: '1px solid',
            borderColor: isExpanded 
              ? 'primary.main' 
              : isDarkMode 
                ? 'rgba(255, 255, 255, 0.15)' 
                : 'rgba(0, 0, 0, 0.08)',
            '&:hover': {
              borderColor: isExpanded ? 'primary.main' : isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)',
              boxShadow: isExpanded ? 3 : 1
            }
          }}
        >
          <SearchIcon sx={{ color: isExpanded ? 'primary.main' : 'text.secondary', mr: 1 }} />
          <InputBase
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            sx={{
              ml: 1,
              flex: 1,
              fontSize: '0.95rem',
              '& .MuiInputBase-input': {
                transition: 'width 0.3s',
                width: isExpanded ? '100%' : '85%',
              }
            }}
          />
          {searchQuery && (
            <IconButton 
              size="small" 
              aria-label="clear search" 
              onClick={handleClearSearch}
              sx={{ p: '5px' }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
          <Divider sx={{ height: 24, mx: 0.5 }} orientation="vertical" />
          <IconButton 
            color={filtersOpen ? "primary" : "default"}
            aria-label="advanced filters" 
            onClick={handleToggleFilters}
            sx={{ 
              p: '5px',
              transition: 'transform 0.2s',
              transform: filtersOpen ? 'rotate(90deg)' : 'none'
            }}
          >
            <TuneIcon />
          </IconButton>
        </Paper>
      </Box>

      <Popper
        open={filtersOpen}
        anchorEl={searchRef.current}
        role={undefined}
        placement="bottom-end"
        transition
        disablePortal
        sx={{ zIndex: 1200, width: 250, mt: 1 }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: 'top right' }}
          >
            <Paper elevation={4} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <ClickAwayListener onClickAway={handleClickAway}>
                <Box>
                  <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
                    <Typography variant="subtitle1" fontWeight="bold">Advanced Filters</Typography>
                  </Box>
                  <MenuList autoFocusItem={filtersOpen}>
                    <MenuItem>
                      <Typography variant="body2">By Date (Newest)</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography variant="body2">By Price (Low to High)</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography variant="body2">Free Datasets Only</Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography variant="body2">Verified Providers Only</Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                      <Typography variant="body2" color="primary">More Filters...</Typography>
                    </MenuItem>
                  </MenuList>
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
} 