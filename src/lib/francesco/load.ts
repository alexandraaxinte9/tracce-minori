import yaml from 'js-yaml';
import type { FrancescoCasella, FrancescoCasellaTipo, FrancescoContent } from './types';
import { parseHeroMarkdown } from './parse';
import { casellaHref } from './href';
import { loadTraccia, tracciaSlugs } from '$lib/tracce/load';
import { loadTracciato, tracciatiSlugs } from '$lib/tracciati/load';

import heroRaw from '$lib/content/storia-di-francesco/storiadifrancesco.md?raw';
import illustrazioneUrl from '$lib/content/storia-di-francesco/illustrazione.png?url';
import manifestRaw from '$lib/content/storia-di-francesco/manifest.yaml?raw';

type ManifestRoot = {
	titolo_sezione_tracce: string;
	titolo_sezione_tracciati: string;
};

function buildCasella(
	tipo: FrancescoCasellaTipo,
	slug: string,
	index: number
): FrancescoCasella {
	if (tipo === 'traccia') {
		const traccia = loadTraccia(slug);
		return {
			id: `tracce-${index + 1}`,
			tipo,
			slug,
			titolo: traccia.titolo,
			imageUrl: null,
			previewSvg: traccia.percorsoSvg,
			href: casellaHref(tipo, slug)!
		};
	}

	const tracciato = loadTracciato(slug);
	return {
		id: `tracciati-${index + 1}`,
		tipo,
		slug,
		titolo: tracciato.titolo,
		imageUrl: null,
		previewSvg: tracciato.percorsoSvg,
		href: casellaHref(tipo, slug)!
	};
}

export function loadFrancesco(): FrancescoContent {
	const manifest = yaml.load(manifestRaw) as ManifestRoot;
	if (!manifest?.titolo_sezione_tracce || !manifest?.titolo_sezione_tracciati) {
		throw new Error('manifest.yaml invalido: servono titoli sezione tracce e tracciati');
	}

	const { titolo, corpo } = parseHeroMarkdown(heroRaw);
	const caselleTracce = tracciaSlugs().map((slug, index) => buildCasella('traccia', slug, index));
	const caselleTracciati = tracciatiSlugs().map((slug, index) =>
		buildCasella('tracciato', slug, index)
	);

	return {
		titolo,
		corpo,
		illustrazioneUrl,
		titoloSezioneTracce: manifest.titolo_sezione_tracce,
		titoloSezioneTracciati: manifest.titolo_sezione_tracciati,
		caselleTracce,
		caselleTracciati
	};
}
