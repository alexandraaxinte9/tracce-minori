import { describe, it, expect } from 'vitest';
import { listTracce, loadTraccia } from './load';

describe('listTracce', () => {
	it('returns at least traccia-01', () => {
		const list = listTracce();
		expect(list.some((t) => t.slug === 'traccia-01')).toBe(true);
		expect(list[0]).toHaveProperty('titolo');
	});
});

describe('loadTraccia', () => {
	it('loads traccia-01 with titolo and frasi', () => {
		const t = loadTraccia('traccia-01');
		expect(t.slug).toBe('traccia-01');
		expect(t.titolo).toBeTruthy();
		expect(t.frasi.length).toBeGreaterThan(0);
		expect(t.percorsoSvg).toContain('<svg');
	});

	it('throws on unknown slug', () => {
		expect(() => loadTraccia('non-esiste')).toThrow();
	});
});
