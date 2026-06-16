import yaml from 'js-yaml';
import type { FrancescoCasella, FrancescoCasellaTipo, FrancescoContent } from './types';
import { parseHeroMarkdown } from './parse';
import { casellaHref } from './href';

import heroRaw from '$lib/content/storia-di-francesco/storiadifrancesco.md?raw';
import illustrazioneUrl from '$lib/content/storia-di-francesco/illustrazione.png?url';
import manifestRaw from '$lib/content/storia-di-francesco/manifest.yaml?raw';

const imageModules = import.meta.glob('/src/lib/content/storia-di-francesco/**/*.{png,svg,jpg,jpeg,webp}', {
	query: '?url',
	eager: true,
	import: 'default'
}) as Record<string, string>;

type ManifestCasella = {
	id: string;
	tipo: FrancescoCasellaTipo;
	slug: string | null;
	image: string | null;
};

type ManifestRoot = {
	titolo_sezione_tracce: string;
	titolo_sezione_tracciati: string;
	caselle: ManifestCasella[];
};

const CONTENT_PREFIX = '/src/lib/content/storia-di-francesco/';

function resolveImageUrl(relativePath: string | null): string | null {
	if (!relativePath) return null;
	const key = `${CONTENT_PREFIX}${relativePath.replace(/^\.\//, '')}`;
	return imageModules[key] ?? null;
}

function toCasella(raw: ManifestCasella): FrancescoCasella {
	return {
		id: raw.id,
		tipo: raw.tipo,
		slug: raw.slug,
		imageUrl: resolveImageUrl(raw.image),
		href: casellaHref(raw.tipo, raw.slug)
	};
}

export function loadFrancesco(): FrancescoContent {
	const manifest = yaml.load(manifestRaw) as ManifestRoot;
	if (!manifest?.caselle || manifest.caselle.length !== 4) {
		throw new Error('manifest.yaml invalido: servono esattamente 4 caselle');
	}

	const { titolo, corpo } = parseHeroMarkdown(heroRaw);
	const caselle = manifest.caselle.map(toCasella);

	return {
		titolo,
		corpo,
		illustrazioneUrl,
		titoloSezioneTracce: manifest.titolo_sezione_tracce,
		titoloSezioneTracciati: manifest.titolo_sezione_tracciati,
		caselleTracce: caselle.filter((c) => c.tipo === 'traccia'),
		caselleTracciati: caselle.filter((c) => c.tipo === 'tracciato')
	};
}
