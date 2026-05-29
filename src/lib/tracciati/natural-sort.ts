/** Ordine numerico naturale per nomi file (1, 2, 10 — non 1, 10, 2). */
export function naturalCompare(a: string, b: string): number {
	return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

export function basenameWithoutExtension(path: string): string {
	const name = path.split(/[/\\]/).pop() ?? path;
	return name.replace(/\.[^.]+$/, '');
}
