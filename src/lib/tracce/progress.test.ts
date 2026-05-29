import { describe, it, expect } from 'vitest';
import { pathProgress, stopCount } from './progress';

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
describe('stopCount', () => {
	it('is 1 + phrase count', () => {
		expect(stopCount(6)).toBe(7);
		expect(stopCount(4)).toBe(5);
	});
});
