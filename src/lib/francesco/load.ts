import type { FrancescoContent } from './types';
import { parseHeroMarkdown } from './parse';

import heroRaw from '$lib/content/storia-di-francesco/storiadifrancesco.md?raw';
import illustrazioneUrl from '$lib/content/storia-di-francesco/illustrazione.png?url';

export function loadFrancesco(): FrancescoContent {
	const { titolo, corpo } = parseHeroMarkdown(heroRaw);

	return {
		titolo,
		corpo,
		illustrazioneUrl
	};
}
