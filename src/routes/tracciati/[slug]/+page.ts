import { error } from '@sveltejs/kit';
import { loadTracciato, tracciatiSlugs } from '$lib/tracciati/load';

export const prerender = true;

export function entries() {
	return tracciatiSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	if (!/^tracciati-\d+$/.test(params.slug)) {
		error(404, 'Tracciato non trovato');
	}

	try {
		return { tracciato: loadTracciato(params.slug) };
	} catch {
		error(404, 'Tracciato non trovato');
	}
}
