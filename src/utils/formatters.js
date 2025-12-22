/**
 * Formats a number into a readable currency string.
 * Handles millions (M) and thousands (K) abbreviations.
 * 
 * @param {number} value - The number to format
 * @param {string} symbol - Currency symbol (default: '$')
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (value, symbol = '$') => {
    if (value === null || value === undefined) return 'N/A';

    const absValue = Math.abs(value);

    if (absValue >= 1000000) {
        return `${symbol}${(value / 1000000).toFixed(1)}M`;
    }

    if (absValue >= 1000) {
        return `${symbol}${(value / 1000).toFixed(1)}K`;
    }

    return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

// Example usage:
// formatCurrency(1200000) -> "$1.2M"
// formatCurrency(500000)  -> "$500.0K"
// formatCurrency(150.5)   -> "$150.50"
