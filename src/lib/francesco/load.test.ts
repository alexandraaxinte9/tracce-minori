import { describe, it, expect } from 'vitest';
import { loadFrancesco } from './load';

describe('loadFrancesco', () => {
	it('loads hero, illustration, section titles and caselle from tracce/tracciati', () => {
		const content = loadFrancesco();
		expect(content.titolo).toBe('La storia di Francesco');
		expect(content.corpo.length).toBeGreaterThan(40);
		expect(content.illustrazioneUrl).toMatch(/\.png$/);
		expect(content.titoloSezioneTracce).toBe('Le sue tracce...');
		expect(content.titoloSezioneTracciati).toBe('e i suoi tracciati');
		expect(content.caselleTracce).toHaveLength(3);
		expect(content.caselleTracciati).toHaveLength(3);
		expect(content.caselleTracce.every((c) => c.tipo === 'traccia')).toBe(true);
		expect(content.caselleTracciati.every((c) => c.tipo === 'tracciato')).toBe(true);
		expect(content.caselleTracce.every((c) => c.previewSvg.includes('<svg'))).toBe(true);
		expect(content.caselleTracciati.every((c) => c.previewSvg.includes('<svg'))).toBe(true);
		expect(content.caselleTracce[0].href).toBe('/tracce/traccia-01');
		expect(content.caselleTracciati[0].href).toBe('/tracciati/tracciati-01');
	});
});
