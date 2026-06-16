import { describe, it, expect } from 'vitest';
import { parseHeroMarkdown } from './parse';

describe('parseHeroMarkdown', () => {
	it('parses # heading as title and rest as body', () => {
		const raw = '# La storia di Francesco\n\nPrimo paragrafo.\nSeconda riga.';
		expect(parseHeroMarkdown(raw)).toEqual({
			titolo: 'La storia di Francesco',
			corpo: 'Primo paragrafo.\nSeconda riga.'
		});
	});

	it('falls back to first-line title without hash', () => {
		const raw = 'Titolo semplice\nCorpo breve.';
		expect(parseHeroMarkdown(raw)).toEqual({
			titolo: 'Titolo semplice',
			corpo: 'Corpo breve.'
		});
	});

	it('returns empty corpo for title-only input', () => {
		expect(parseHeroMarkdown('# Solo titolo')).toEqual({
			titolo: 'Solo titolo',
			corpo: ''
		});
	});
});
