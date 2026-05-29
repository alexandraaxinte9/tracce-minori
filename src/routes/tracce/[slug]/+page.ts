import { error } from '@sveltejs/kit';
import { loadTraccia, tracciaSlugs } from '$lib/tracce/load';

export const prerender = true;

export function entries() {
	return tracciaSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	if (!/^traccia-\d+$/.test(params.slug)) {
		error(404, 'Traccia non trovata');
	}

	try {
		return { traccia: loadTraccia(params.slug) };
	} catch {
		error(404, 'Traccia non trovata');
	}
}
