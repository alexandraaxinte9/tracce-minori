export function parseHeroMarkdown(raw: string): { titolo: string; corpo: string } {
	const trimmed = raw.trim();
	if (!trimmed) {
		return { titolo: '', corpo: '' };
	}

	if (trimmed.startsWith('#')) {
		const nl = trimmed.indexOf('\n');
		const titolo = (nl === -1 ? trimmed.slice(1) : trimmed.slice(1, nl)).trim();
		const rest = nl === -1 ? '' : trimmed.slice(nl + 1).trim();
		return { titolo, corpo: rest };
	}

	const nl = trimmed.indexOf('\n');
	if (nl === -1) {
		return { titolo: trimmed, corpo: '' };
	}
	return {
		titolo: trimmed.slice(0, nl).trim(),
		corpo: trimmed.slice(nl + 1).trim()
	};
}
