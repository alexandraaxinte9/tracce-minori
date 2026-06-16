import { loadFrancesco } from '$lib/francesco/load';

export const prerender = true;

export function load() {
	return { francesco: loadFrancesco() };
}
