/**
 * Format a date string into a human-readable format
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * Format a price string to ensure it has the currency symbol
 */
export function formatPrice(price: string): string {
  if (price === 'Free') {
    return price;
  }

  // If price doesn't start with a currency symbol, add $
  if (!price.startsWith('$') && !price.startsWith('€') && !price.startsWith('£')) {
    return `$${price}`;
  }

  return price;
}

/**
 * Format a file size string to ensure it has the appropriate unit
 */
export function formatFileSize(size: string | number): string {
  if (typeof size === 'string') {
    // If already formatted, return as is
    if (size.includes('KB') || size.includes('MB') || size.includes('GB') || size.includes('TB')) {
      return size;
    }
    
    // Convert to number if it's a numeric string
    size = parseFloat(size);
  }
  
  // Format based on size
  if (size < 1024) {
    return `${Math.round(size)} B`;
  } else if (size < 1024 * 1024) {
    return `${Math.round(size / 1024 * 10) / 10} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${Math.round(size / (1024 * 1024) * 10) / 10} MB`;
  } else {
    return `${Math.round(size / (1024 * 1024 * 1024) * 10) / 10} GB`;
  }
}

/**
 * Truncate a string to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength)}...`;
} 