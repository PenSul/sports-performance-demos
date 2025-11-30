import { describe, it, expect } from 'vitest';

// Formatting utility functions
const formatPercentage = (value, decimals = 1) => {
  if (typeof value !== 'number' || isNaN(value)) return '0%';
  return `${value.toFixed(decimals)}%`;
};

const formatDuration = (minutes) => {
  if (!minutes || minutes < 0) return '0m';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatAthleteStatus = (status) => {
  const statusMap = {
    'active': 'Active',
    'injured': 'Injured',
    'inactive': 'Inactive',
    'recovery': 'In Recovery'
  };
  return statusMap[status?.toLowerCase()] || 'Unknown';
};

const formatPerformanceScore = (score) => {
  if (typeof score !== 'number') return 'N/A';
  if (score >= 90) return { value: score, label: 'Excellent', color: 'green' };
  if (score >= 75) return { value: score, label: 'Good', color: 'blue' };
  if (score >= 60) return { value: score, label: 'Average', color: 'yellow' };
  return { value: score, label: 'Needs Improvement', color: 'red' };
};

describe('Formatting Utilities', () => {
  describe('formatPercentage', () => {
    it('should format positive percentages', () => {
      expect(formatPercentage(85.5)).toBe('85.5%');
      expect(formatPercentage(100)).toBe('100.0%');
      expect(formatPercentage(0)).toBe('0.0%');
    });

    it('should format with custom decimal places', () => {
      expect(formatPercentage(85.555, 2)).toBe('85.56%');
      expect(formatPercentage(85.5, 0)).toBe('86%');
    });

    it('should handle negative percentages', () => {
      expect(formatPercentage(-10.5)).toBe('-10.5%');
    });

    it('should return 0% for invalid input', () => {
      expect(formatPercentage(null)).toBe('0%');
      expect(formatPercentage(undefined)).toBe('0%');
      expect(formatPercentage('invalid')).toBe('0%');
    });
  });

  describe('formatDuration', () => {
    it('should format minutes only', () => {
      expect(formatDuration(30)).toBe('30m');
      expect(formatDuration(45)).toBe('45m');
    });

    it('should format hours only', () => {
      expect(formatDuration(60)).toBe('1h');
      expect(formatDuration(120)).toBe('2h');
    });

    it('should format hours and minutes', () => {
      expect(formatDuration(90)).toBe('1h 30m');
      expect(formatDuration(150)).toBe('2h 30m');
    });

    it('should return 0m for invalid input', () => {
      expect(formatDuration(0)).toBe('0m');
      expect(formatDuration(-30)).toBe('0m');
      expect(formatDuration(null)).toBe('0m');
    });
  });

  describe('formatDate', () => {
    it('should format valid date strings', () => {
      expect(formatDate('2025-11-15')).toBe('Nov 15, 2025');
      expect(formatDate('2025-01-01')).toBe('Jan 1, 2025');
    });

    it('should return empty string for invalid input', () => {
      expect(formatDate('')).toBe('');
      expect(formatDate(null)).toBe('');
      expect(formatDate(undefined)).toBe('');
    });
  });

  describe('formatAthleteStatus', () => {
    it('should format known statuses', () => {
      expect(formatAthleteStatus('active')).toBe('Active');
      expect(formatAthleteStatus('injured')).toBe('Injured');
      expect(formatAthleteStatus('inactive')).toBe('Inactive');
      expect(formatAthleteStatus('recovery')).toBe('In Recovery');
    });

    it('should handle case insensitivity', () => {
      expect(formatAthleteStatus('ACTIVE')).toBe('Active');
      expect(formatAthleteStatus('Active')).toBe('Active');
    });

    it('should return Unknown for invalid status', () => {
      expect(formatAthleteStatus('invalid')).toBe('Unknown');
      expect(formatAthleteStatus(null)).toBe('Unknown');
    });
  });

  describe('formatPerformanceScore', () => {
    it('should return Excellent for scores 90+', () => {
      const result = formatPerformanceScore(95);
      expect(result.label).toBe('Excellent');
      expect(result.color).toBe('green');
    });

    it('should return Good for scores 75-89', () => {
      const result = formatPerformanceScore(80);
      expect(result.label).toBe('Good');
      expect(result.color).toBe('blue');
    });

    it('should return Average for scores 60-74', () => {
      const result = formatPerformanceScore(65);
      expect(result.label).toBe('Average');
      expect(result.color).toBe('yellow');
    });

    it('should return Needs Improvement for scores below 60', () => {
      const result = formatPerformanceScore(50);
      expect(result.label).toBe('Needs Improvement');
      expect(result.color).toBe('red');
    });

    it('should return N/A for non-numeric input', () => {
      expect(formatPerformanceScore('high')).toBe('N/A');
      expect(formatPerformanceScore(null)).toBe('N/A');
    });
  });
});
