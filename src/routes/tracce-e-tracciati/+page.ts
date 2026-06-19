import { loadTraccia, listTracce } from '$lib/tracce/load';
import { loadTracciato, listTracciati } from '$lib/tracciati/load';

export const prerender = true;

export function load() {
	return {
		tracce: listTracce().map(({ slug, titolo }) => {
			const { percorsoSvg } = loadTraccia(slug);
			return { slug, titolo, previewSvg: percorsoSvg };
		}),
		tracciati: listTracciati().map(({ slug, titolo }) => {
			const { percorsoSvg } = loadTracciato(slug);
			return { slug, titolo, previewSvg: percorsoSvg };
		})
	};
}
