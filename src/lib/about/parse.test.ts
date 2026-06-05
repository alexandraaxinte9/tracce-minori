import { describe, it, expect } from 'vitest';
import { parseSectionMarkdown, parseIntroMarkdown } from './parse';

describe('parseSectionMarkdown', () => {
	it('splits first line as title and rest as body', () => {
		const raw = 'Tracce\nPrima riga corpo.\nSeconda riga.';
		expect(parseSectionMarkdown(raw)).toEqual({
			titolo: 'Tracce',
			corpo: 'Prima riga corpo.\nSeconda riga.'
		});
	});
});

describe('parseIntroMarkdown', () => {
	it('returns trimmed intro text', () => {
		expect(parseIntroMarkdown('  Testo intro  \n')).toBe('Testo intro');
	});
});
