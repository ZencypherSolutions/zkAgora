"use client";

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Chip, 
  Button, 
  Divider, 
  Grid, 
  Collapse, 
  IconButton, 
  Stack,
  Avatar,
  Tooltip,
  useTheme
} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/FavoriteBorder';
import DatasetIcon from '@mui/icons-material/Storage';
import Link from 'next/link';

// Interface for dataset properties
export interface DatasetCardProps {
  id: string;
  title: string;
  description: string;
  provider: {
    name: string;
    avatar?: string;
    verified: boolean;
  };
  previewImage: string;
  verifications: {
    type: 'identity' | 'integrity' | 'privacy' | 'compliance';
    verified: boolean;
  }[];
  stats: {
    size: string;
    format: string;
    lastUpdated: string;
    records: number;
  };
  tags: string[];
  price: string | number;
  isFree: boolean;
}

export function DatasetCard({ 
  id, 
  title, 
  description, 
  provider, 
  previewImage, 
  verifications, 
  stats, 
  tags,
  price,
  isFree
}: DatasetCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const theme = useTheme();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Map verification types to friendly names and colors
  const verificationLabels = {
    identity: { label: 'Provider Identity', color: 'success' },
    integrity: { label: 'Data Integrity', color: 'info' },
    privacy: { label: 'Privacy Preserving', color: 'secondary' },
    compliance: { label: 'Regulatory Compliance', color: 'warning' }
  };

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: expanded ? 'auto' : '520px',
        minHeight: expanded ? 'auto' : '520px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme => theme.shadows[6],
        },
        overflow: 'visible',
        borderRadius: 2,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        {imageError ? (
          <Box 
            sx={{ 
              height: 160, 
              width: '100%',
              minHeight: 160,
              maxHeight: 160,
              bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <DatasetIcon 
              sx={{ 
                fontSize: 64, 
                color: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.15)'
              }} 
            />
          </Box>
        ) : (
          <CardMedia
            component="img"
            height="160"
            image={previewImage}
            alt={`${title} visualization preview`}
            onError={handleImageError}
            sx={{ 
              width: '100%',
              height: 160,
              minHeight: 160,
              maxHeight: 160,
              objectFit: 'cover',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8
            }}
          />
        )}
        
        {/* Price badge overlay */}
        <Chip
          label={isFree ? 'Free' : `$${price}`}
          color={isFree ? 'success' : 'primary'}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            fontWeight: 'bold',
            boxShadow: 2
          }}
        />
      </Box>

      <CardContent sx={{ 
        pb: 1, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Avatar 
            src={provider.avatar}
            alt={provider.name}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {provider.name}
          </Typography>
          {provider.verified && (
            <Tooltip title="Verified Provider">
              <VerifiedIcon sx={{ ml: 0.5, fontSize: 16, color: 'primary.main' }} />
            </Tooltip>
          )}
        </Box>

        <Typography variant="h6" component="h2" gutterBottom sx={{ 
          fontWeight: 'bold',
          minHeight: 56,
          maxHeight: 56,
          lineHeight: 1.3,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
        }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ 
          mb: 2,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          minHeight: 60,
          maxHeight: 60,
        }}>
          {description}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
          {verifications.map(v => (
            <Tooltip key={v.type} title={verificationLabels[v.type].label}>
              <Chip 
                size="small"
                label={v.type.charAt(0).toUpperCase() + v.type.slice(1)}
                color={v.verified ? verificationLabels[v.type].color as any : undefined}
                variant={v.verified ? "filled" : "outlined"}
                sx={{ 
                  height: 24,
                  fontSize: '0.75rem',
                  opacity: v.verified ? 1 : 0.6
                }}
              />
            </Tooltip>
          ))}
        </Stack>

        <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(3, 1fr)', mb: 2 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Size
            </Typography>
            <Typography variant="body2" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {stats.size}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Format
            </Typography>
            <Typography variant="body2" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {stats.format}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption" color="text.secondary" display="block">
              Records
            </Typography>
            <Typography variant="body2" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {stats.records.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 'auto', 
          pt: 1,
          width: '100%'
        }}>
          <Stack direction="row" spacing={1}>
            <IconButton 
              size="small" 
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
              sx={{ 
                transition: 'transform 0.2s',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)'
              }}
            >
              <ExpandMoreIcon />
            </IconButton>
            <Tooltip title="Add to favorites">
              <IconButton size="small">
                <FavoriteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
          
          <Link href={`/datasets/${id}`} style={{ textDecoration: 'none' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="small"
              sx={{ borderRadius: 28 }}
            >
              View Dataset
            </Button>
          </Link>
        </Box>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography paragraph variant="body2">
            {description}
          </Typography>
          
          <Typography variant="caption" color="text.secondary" paragraph>
            Last Updated: {stats.lastUpdated}
          </Typography>
          
          <Stack direction="row" spacing={0.5} sx={{ mb: 2, flexWrap: 'wrap', gap: 0.5 }}>
            {tags.map(tag => (
              <Chip 
                key={tag}
                label={tag}
                size="small"
                variant="outlined"
                sx={{ height: 24 }}
              />
            ))}
          </Stack>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<InfoIcon />}
              sx={{ borderRadius: 28 }}
            >
              Documentation
            </Button>
            
            <Button
              variant="outlined"
              size="small"
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 28 }}
            >
              Download Sample
            </Button>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
} 