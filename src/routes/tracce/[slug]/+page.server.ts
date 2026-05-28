import { error } from '@sveltejs/kit';
import { loadTraccia } from '$lib/tracce/load';

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
