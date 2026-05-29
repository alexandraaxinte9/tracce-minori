import { describe, it, expect } from 'vitest';
import { pathProgress, scrollPathProgress, stopCount } from './progress';

describe('pathProgress', () => {
	it('returns 0 on title stop (index 0)', () => {
		expect(pathProgress(0, 6)).toBe(0);
	});
	it('returns i/N for phrase stop i', () => {
		expect(pathProgress(1, 6)).toBeCloseTo(1 / 6);
		expect(pathProgress(3, 6)).toBeCloseTo(3 / 6);
		expect(pathProgress(6, 6)).toBe(1);
	});
	it('works with variable phrase counts', () => {
		expect(pathProgress(2, 4)).toBe(0.5);
	});
});
describe('scrollPathProgress', () => {
	const centers = [500, 1500, 2500, 3500, 4500, 5500, 6500]; // titolo + 6 frasi

	it('returns 0 at or before title center', () => {
		expect(scrollPathProgress(500, centers, 6)).toBe(0);
		expect(scrollPathProgress(400, centers, 6)).toBe(0);
	});

	it('interpolates from title toward first phrase', () => {
		const mid = scrollPathProgress(1000, centers, 6);
		expect(mid).toBeGreaterThan(0);
		expect(mid).toBeLessThan(1 / 6);
		expect(scrollPathProgress(1500, centers, 6)).toBeCloseTo(1 / 6);
	});

	it('interpolates between phrase stops', () => {
		expect(scrollPathProgress(2500, centers, 6)).toBeCloseTo(2 / 6);
		expect(scrollPathProgress(3000, centers, 6)).toBeCloseTo(2.5 / 6);
	});

	it('returns 1 at or after last phrase', () => {
		expect(scrollPathProgress(6500, centers, 6)).toBe(1);
		expect(scrollPathProgress(7000, centers, 6)).toBe(1);
	});
});

describe('stopCount', () => {
	it('is 1 + phrase count', () => {
		expect(stopCount(6)).toBe(7);
		expect(stopCount(4)).toBe(5);
	});
});
