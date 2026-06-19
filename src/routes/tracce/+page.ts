import { redirect } from '@sveltejs/kit';
import { base } from '$app/paths';

export function load() {
	redirect(308, `${base}/tracce-e-tracciati`);
}
