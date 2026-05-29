import type { TracciatoContent, TracciatoSummary } from './types';
import { basenameWithoutExtension, naturalCompare } from './natural-sort';

const svgModules = import.meta.glob('/src/lib/content/tracciati/*/percorso.svg', {
	query: '?raw',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const fotoModules = import.meta.glob('/src/lib/content/tracciati/*/foto/*', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const disegniModules = import.meta.glob('/src/lib/content/tracciati/*/disegni/*.svg', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

const SLUG_RE = /\/tracciati\/(tracciati-\d+)\//;

function slugFromPercorsoPath(path: string): string {
	const match = path.match(SLUG_RE);
	if (!match) throw new Error(`Percorso non valido: ${path}`);
	return match[1];
}

function percorsoPath(slug: string): string {
	return `/src/lib/content/tracciati/${slug}/percorso.svg`;
}

export function titoloFromSlug(slug: string): string {
	const match = slug.match(/tracciati-(\d+)/);
	return match ? `Tracciato ${match[1]}` : slug;
}

function fotosForSlug(slug: string): TracciatoContent['fotos'] {
	const prefix = `/src/lib/content/tracciati/${slug}/foto/`;
	return Object.entries(fotoModules)
		.filter(([path]) => path.startsWith(prefix))
		.map(([path, url]) => ({
			id: basenameWithoutExtension(path),
			url
		}))
		.sort((a, b) => naturalCompare(a.id, b.id));
}

function disegniForSlug(slug: string): Record<string, string> {
	const prefix = `/src/lib/content/tracciati/${slug}/disegni/`;
	const out: Record<string, string> = {};
	for (const [path, url] of Object.entries(disegniModules)) {
		if (!path.startsWith(prefix)) continue;
		out[basenameWithoutExtension(path)] = url;
	}
	return out;
}

export function tracciatiSlugs(): string[] {
	return Object.keys(svgModules)
		.map(slugFromPercorsoPath)
		.sort();
}

export function listTracciati(): TracciatoSummary[] {
	return tracciatiSlugs().map((slug) => ({
		slug,
		titolo: titoloFromSlug(slug)
	}));
}

export function loadTracciato(slug: string): TracciatoContent {
	const percorsoSvg = svgModules[percorsoPath(slug)];
	if (!percorsoSvg) {
		throw new Error(`Tracciato non trovato: ${slug}`);
	}
	return {
		slug,
		titolo: titoloFromSlug(slug),
		percorsoSvg,
		fotos: fotosForSlug(slug),
		disegni: disegniForSlug(slug)
	};
}
