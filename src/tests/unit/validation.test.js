import { describe, it, expect } from 'vitest';

// Validation utility functions
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  if (!password) return false;
  return password.length >= 8;
};

const validateAthleteData = (athlete) => {
  const requiredFields = ['name', 'email', 'sport', 'status'];
  const missingFields = requiredFields.filter(field => !athlete[field]);
  return {
    isValid: missingFields.length === 0,
    missingFields
  };
};

const validatePerformanceScore = (score) => {
  return typeof score === 'number' && score >= 0 && score <= 100;
};

const validateDateRange = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(validateEmail('coach@sports.com')).toBe(true);
      expect(validateEmail('athlete.name@university.edu')).toBe(true);
      expect(validateEmail('analyst123@analytics.org')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('missing@domain')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('spaces in@email.com')).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(validateEmail(null)).toBe(false);
      expect(validateEmail(undefined)).toBe(false);
    });
  });

  describe('validatePassword', () => {
    it('should return true for passwords with 8 or more characters', () => {
      expect(validatePassword('password123')).toBe(true);
      expect(validatePassword('12345678')).toBe(true);
      expect(validatePassword('securePassword!')).toBe(true);
    });

    it('should return false for passwords with fewer than 8 characters', () => {
      expect(validatePassword('short')).toBe(false);
      expect(validatePassword('1234567')).toBe(false);
      expect(validatePassword('')).toBe(false);
    });

    it('should return false for null or undefined', () => {
      expect(validatePassword(null)).toBe(false);
      expect(validatePassword(undefined)).toBe(false);
    });
  });

  describe('validateAthleteData', () => {
    it('should return valid for complete athlete data', () => {
      const athlete = {
        name: 'John Smith',
        email: 'john@sports.com',
        sport: 'Swimming',
        status: 'Active'
      };
      const result = validateAthleteData(athlete);
      expect(result.isValid).toBe(true);
      expect(result.missingFields).toHaveLength(0);
    });

    it('should return invalid with missing fields listed', () => {
      const athlete = {
        name: 'John Smith',
        email: 'john@sports.com'
      };
      const result = validateAthleteData(athlete);
      expect(result.isValid).toBe(false);
      expect(result.missingFields).toContain('sport');
      expect(result.missingFields).toContain('status');
    });

    it('should handle empty object', () => {
      const result = validateAthleteData({});
      expect(result.isValid).toBe(false);
      expect(result.missingFields).toHaveLength(4);
    });
  });

  describe('validatePerformanceScore', () => {
    it('should return true for valid scores between 0 and 100', () => {
      expect(validatePerformanceScore(0)).toBe(true);
      expect(validatePerformanceScore(50)).toBe(true);
      expect(validatePerformanceScore(100)).toBe(true);
      expect(validatePerformanceScore(85.5)).toBe(true);
    });

    it('should return false for scores outside valid range', () => {
      expect(validatePerformanceScore(-1)).toBe(false);
      expect(validatePerformanceScore(101)).toBe(false);
      expect(validatePerformanceScore(150)).toBe(false);
    });

    it('should return false for non-numeric values', () => {
      expect(validatePerformanceScore('85')).toBe(false);
      expect(validatePerformanceScore(null)).toBe(false);
      expect(validatePerformanceScore(undefined)).toBe(false);
    });
  });

  describe('validateDateRange', () => {
    it('should return true when start date is before end date', () => {
      expect(validateDateRange('2025-01-01', '2025-12-31')).toBe(true);
      expect(validateDateRange('2025-11-01', '2025-11-30')).toBe(true);
    });

    it('should return true when start and end dates are the same', () => {
      expect(validateDateRange('2025-11-15', '2025-11-15')).toBe(true);
    });

    it('should return false when start date is after end date', () => {
      expect(validateDateRange('2025-12-31', '2025-01-01')).toBe(false);
    });
  });
});
