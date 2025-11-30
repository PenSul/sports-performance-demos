import { describe, it, expect } from 'vitest';

// Performance calculation functions
const calculateAverageScore = (scores) => {
  if (!scores || scores.length === 0) return 0;
  const sum = scores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / scores.length) * 10) / 10;
};

const calculatePerformanceChange = (current, previous) => {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100 * 10) / 10;
};

const calculateTrendDirection = (dataPoints) => {
  if (!dataPoints || dataPoints.length < 2) return 'stable';
  const firstHalf = dataPoints.slice(0, Math.floor(dataPoints.length / 2));
  const secondHalf = dataPoints.slice(Math.floor(dataPoints.length / 2));
  const firstAvg = calculateAverageScore(firstHalf);
  const secondAvg = calculateAverageScore(secondHalf);
  const change = calculatePerformanceChange(secondAvg, firstAvg);
  if (change > 5) return 'improving';
  if (change < -5) return 'declining';
  return 'stable';
};

const calculatePercentile = (score, allScores) => {
  if (!allScores || allScores.length === 0) return 0;
  const sortedScores = [...allScores].sort((a, b) => a - b);
  const index = sortedScores.findIndex(s => s >= score);
  if (index === -1) return 100;
  return Math.round((index / sortedScores.length) * 100);
};

const calculateWeeklyLoad = (sessions) => {
  if (!sessions || sessions.length === 0) return 0;
  return sessions.reduce((total, session) => {
    return total + (session.duration * session.intensity);
  }, 0);
};

describe('Performance Calculations', () => {
  describe('calculateAverageScore', () => {
    it('should calculate correct average for valid scores', () => {
      expect(calculateAverageScore([80, 85, 90])).toBe(85);
      expect(calculateAverageScore([70, 75, 80, 85])).toBe(77.5);
      expect(calculateAverageScore([100])).toBe(100);
    });

    it('should return 0 for empty array', () => {
      expect(calculateAverageScore([])).toBe(0);
    });

    it('should return 0 for null or undefined', () => {
      expect(calculateAverageScore(null)).toBe(0);
      expect(calculateAverageScore(undefined)).toBe(0);
    });

    it('should handle decimal values', () => {
      expect(calculateAverageScore([85.5, 90.5])).toBe(88);
    });
  });

  describe('calculatePerformanceChange', () => {
    it('should calculate positive percentage change', () => {
      expect(calculatePerformanceChange(110, 100)).toBe(10);
      expect(calculatePerformanceChange(150, 100)).toBe(50);
    });

    it('should calculate negative percentage change', () => {
      expect(calculatePerformanceChange(90, 100)).toBe(-10);
      expect(calculatePerformanceChange(50, 100)).toBe(-50);
    });

    it('should return 0 for no change', () => {
      expect(calculatePerformanceChange(100, 100)).toBe(0);
    });

    it('should handle zero previous value', () => {
      expect(calculatePerformanceChange(50, 0)).toBe(100);
      expect(calculatePerformanceChange(0, 0)).toBe(0);
    });
  });

  describe('calculateTrendDirection', () => {
    it('should identify improving trend', () => {
      expect(calculateTrendDirection([70, 72, 75, 80, 85, 90])).toBe('improving');
    });

    it('should identify declining trend', () => {
      expect(calculateTrendDirection([90, 85, 80, 75, 72, 70])).toBe('declining');
    });

    it('should identify stable trend', () => {
      expect(calculateTrendDirection([80, 81, 79, 80, 80, 81])).toBe('stable');
    });

    it('should return stable for insufficient data', () => {
      expect(calculateTrendDirection([80])).toBe('stable');
      expect(calculateTrendDirection([])).toBe('stable');
    });
  });

  describe('calculatePercentile', () => {
    it('should calculate correct percentile', () => {
      const scores = [60, 70, 75, 80, 85, 90, 95, 100];
      expect(calculatePercentile(85, scores)).toBe(50);
      expect(calculatePercentile(95, scores)).toBe(75);
    });

    it('should return 0 for lowest score', () => {
      const scores = [60, 70, 80, 90];
      expect(calculatePercentile(60, scores)).toBe(0);
    });

    it('should return 100 for score above all others', () => {
      const scores = [60, 70, 80, 90];
      expect(calculatePercentile(100, scores)).toBe(100);
    });

    it('should handle empty array', () => {
      expect(calculatePercentile(80, [])).toBe(0);
    });
  });

  describe('calculateWeeklyLoad', () => {
    it('should calculate total training load', () => {
      const sessions = [
        { duration: 60, intensity: 0.8 },
        { duration: 45, intensity: 0.9 },
        { duration: 90, intensity: 0.6 }
      ];
      expect(calculateWeeklyLoad(sessions)).toBe(60 * 0.8 + 45 * 0.9 + 90 * 0.6);
    });

    it('should return 0 for empty sessions', () => {
      expect(calculateWeeklyLoad([])).toBe(0);
      expect(calculateWeeklyLoad(null)).toBe(0);
    });

    it('should handle single session', () => {
      const sessions = [{ duration: 60, intensity: 1.0 }];
      expect(calculateWeeklyLoad(sessions)).toBe(60);
    });
  });
});
