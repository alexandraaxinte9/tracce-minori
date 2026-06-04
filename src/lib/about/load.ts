import { loadTraccia } from '$lib/tracce/load';
import { loadTracciato } from '$lib/tracciati/load';
import type { AboutContent } from './types';
import { parseIntroMarkdown, parseSectionMarkdown } from './parse';

import introRaw from '$lib/content/about/testi/intro.md?raw';
import tracceRaw from '$lib/content/about/testi/tracce.md?raw';
import tracciatiRaw from '$lib/content/about/testi/tracciati.md?raw';
import fotoTracceUrl from '$lib/content/about/tracce.png/Mask group.png?url';
import fotoTracciatiUrl from '$lib/content/about/tracciati.png/Mask group (1).png?url';

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
