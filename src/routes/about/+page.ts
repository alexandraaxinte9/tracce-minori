import { loadAbout } from '$lib/about/load';

export const prerender = true;

export function load() {
	return { about: loadAbout() };
}
