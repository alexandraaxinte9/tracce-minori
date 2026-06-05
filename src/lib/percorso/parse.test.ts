import { describe, it, expect } from 'vitest';
import { parsePercorsoSvg } from './parse';

describe('parsePercorsoSvg', () => {
	it('extracts viewBox and path d from traccia-01 svg', () => {
		const svg = `<svg viewBox="0 0 272 1002"><path d="M 1 2 L 3 4"/></svg>`;
		const parsed = parsePercorsoSvg(svg);
		expect(parsed.viewBox).toBe('0 0 272 1002');
		expect(parsed.pathD).toBe('M 1 2 L 3 4');
	});

	it('returns empty path when missing', () => {
		const parsed = parsePercorsoSvg('<svg viewBox="0 0 10 10"></svg>');
		expect(parsed.pathD).toBe('');
	});
});
