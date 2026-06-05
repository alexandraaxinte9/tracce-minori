import type { FrancescoCasellaTipo } from './types';

export function casellaHref(tipo: FrancescoCasellaTipo, slug: string | null): string | null {
	if (!slug) return null;
	return tipo === 'traccia' ? `/tracce/${slug}` : `/tracciati/${slug}`;
}
