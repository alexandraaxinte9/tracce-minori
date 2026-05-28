import { tracciaSlugs } from '$lib/tracce/load';

export const prerender = true;

export function entries() {
	return tracciaSlugs().map((slug) => ({ slug }));
}
