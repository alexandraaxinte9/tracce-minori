import { listTracce } from '$lib/tracce/load';
import { listTracciati } from '$lib/tracciati/load';

export const prerender = true;

export function load() {
	return {
		tracce: listTracce(),
		tracciati: listTracciati()
	};
}
