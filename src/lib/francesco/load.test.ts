import { describe, it, expect } from 'vitest';
import { loadFrancesco } from './load';

describe('loadFrancesco', () => {
	it('loads hero and illustration', () => {
		const content = loadFrancesco();
		expect(content.titolo).toBe('La storia di Francesco');
		expect(content.corpo.length).toBeGreaterThan(40);
		expect(content.illustrazioneUrl).toMatch(/\.png$/);
	});
});
