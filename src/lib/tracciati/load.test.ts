import { describe, it, expect } from 'vitest';
import { listTracciati, loadTracciato } from './load';
import { naturalCompare } from './natural-sort';

describe('naturalCompare', () => {
	it('orders numeric filenames naturally', () => {
		expect(naturalCompare('2', '10')).toBeLessThan(0);
		expect(naturalCompare('10', '2')).toBeGreaterThan(0);
	});
});

describe('listTracciati', () => {
	it('includes tracciati-01', () => {
		const list = listTracciati();
		expect(list.some((t) => t.slug === 'tracciati-01')).toBe(true);
		expect(list[0]).toHaveProperty('titolo');
	});
});

describe('loadTracciato', () => {
	it('loads tracciati-01 with photos and svg', () => {
		const t = loadTracciato('tracciati-01');
		expect(t.slug).toBe('tracciati-01');
		expect(t.titolo).toBe('Tracciato 01');
		expect(t.fotos.length).toBeGreaterThan(0);
		expect(t.percorsoSvg).toContain('<svg');
		expect(t.fotos[0].url).toBeTruthy();
	});

	it('orders photos by natural id', () => {
		const ids = loadTracciato('tracciati-01').fotos.map((f) => f.id);
		const sorted = [...ids].sort(naturalCompare);
		expect(ids).toEqual(sorted);
	});

	it('throws on unknown slug', () => {
		expect(() => loadTracciato('non-esiste')).toThrow();
	});

	it('loads tracciati-02 without photos', () => {
		const t = loadTracciato('tracciati-02');
		expect(t.fotos).toHaveLength(0);
		expect(t.percorsoSvg).toContain('<svg');
	});
});
