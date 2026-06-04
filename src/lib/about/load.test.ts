import { describe, it, expect } from 'vitest';
import { loadAbout } from './load';

describe('loadAbout', () => {
	it('loads intro, sections, photos and percorso svgs', () => {
		const about = loadAbout();
		expect(about.intro.length).toBeGreaterThan(20);
		expect(about.tracce.titolo).toBe('Tracce');
		expect(about.tracciati.titolo).toBe('Tracciati');
		expect(about.fotoTracceUrl).toMatch(/\.png$/);
		expect(about.fotoTracciatiUrl).toMatch(/\.png$/);
		expect(about.percorsoTracceSvg).toContain('<svg');
		expect(about.percorsoTracciatiSvg).toContain('<svg');
	});
});
