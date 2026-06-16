import { describe, it, expect } from 'vitest';
import { loadFrancesco } from './load';

describe('loadFrancesco', () => {
	it('loads hero, illustration, section titles and four caselle', () => {
		const content = loadFrancesco();
		expect(content.titolo).toBe('La storia di Francesco');
		expect(content.corpo.length).toBeGreaterThan(40);
		expect(content.illustrazioneUrl).toMatch(/\.png$/);
		expect(content.titoloSezioneTracce).toBe('Le sue tracce...');
		expect(content.titoloSezioneTracciati).toBe('e i suoi tracciati');
		expect(content.caselleTracce).toHaveLength(2);
		expect(content.caselleTracciati).toHaveLength(2);
		expect(content.caselleTracce.every((c) => c.tipo === 'traccia')).toBe(true);
		expect(content.caselleTracciati.every((c) => c.tipo === 'tracciato')).toBe(true);
		expect(content.caselleTracce.every((c) => c.href === null)).toBe(true);
	});
});
