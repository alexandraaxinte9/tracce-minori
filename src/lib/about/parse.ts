import type { AboutSection } from './types';

export function parseSectionMarkdown(raw: string): AboutSection {
	const trimmed = raw.trim();
	const nl = trimmed.indexOf('\n');
	if (nl === -1) {
		return { titolo: trimmed, corpo: '' };
	}
	return {
		titolo: trimmed.slice(0, nl).trim(),
		corpo: trimmed.slice(nl + 1).trim()
	};
}

export function parseIntroMarkdown(raw: string): string {
	return raw.trim();
}
