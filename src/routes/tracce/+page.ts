import { listTracce } from '$lib/tracce/load';

export const prerender = true;

export function load() {
	return { tracce: listTracce() };
}
