import { describe, it, expect } from 'vitest';
import { casellaHref } from './href';

describe('casellaHref', () => {
	it('returns null when slug is null', () => {
		expect(casellaHref('traccia', null)).toBeNull();
	});

	it('returns traccia URL for traccia tipo', () => {
		expect(casellaHref('traccia', 'la-mia-traccia')).toBe('/tracce/la-mia-traccia');
	});

	it('returns tracciato URL for tracciato tipo', () => {
		expect(casellaHref('tracciato', 'il-mio-tracciato')).toBe('/tracciati/il-mio-tracciato');
	});
});
