import { loadTraccia } from '$lib/tracce/load';
import { loadTracciato } from '$lib/tracciati/load';
import type { AboutContent } from './types';
import { parseIntroMarkdown, parseSectionMarkdown } from './parse';

import introRaw from '$lib/content/about/intro.md?raw';
import tracceRaw from '$lib/content/about/tracce.md?raw';
import tracciatiRaw from '$lib/content/about/tracciati.md?raw';
import fotoTracceUrl from '$lib/content/about/foto-tracce.png?url';
import fotoTracciatiUrl from '$lib/content/about/foto-tracciati.png?url';

const TRACCIA_SLUG = 'traccia-01';
const TRACCIATO_SLUG = 'tracciati-01';

export function loadAbout(): AboutContent {
	const intro = parseIntroMarkdown(introRaw);
	const tracce = parseSectionMarkdown(tracceRaw);
	const tracciati = parseSectionMarkdown(tracciatiRaw);
	const { percorsoSvg: percorsoTracceSvg } = loadTraccia(TRACCIA_SLUG);
	const { percorsoSvg: percorsoTracciatiSvg } = loadTracciato(TRACCIATO_SLUG);

	return {
		intro,
		tracce,
		tracciati,
		fotoTracceUrl,
		fotoTracciatiUrl,
		percorsoTracceSvg,
		percorsoTracciatiSvg
	};
}
