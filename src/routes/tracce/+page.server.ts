import { listTracce } from '$lib/tracce/load';

export function load() {
	return { tracce: listTracce() };
}
