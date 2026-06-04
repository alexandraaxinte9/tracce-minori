/**
 * Asset homepage — cambia i nomi file qui se rinomini i file in
 * `src/lib/content/home/` e `src/lib/content/home/illustrazioni/`.
 */
import logotipo from './logotipo.png';
import illustTopLeft from './illustrazioni/image 1.png';
import illustTopRight from './illustrazioni/image 2.png';
import illustBottomLeft from './illustrazioni/image 3.png';
import illustBottomRight from './illustrazioni/image 4.png';

export const homeAssets = {
	logotipo,
	illustrations: {
		topLeft: illustTopLeft,
		topRight: illustTopRight,
		bottomLeft: illustBottomLeft,
		bottomRight: illustBottomRight
	}
} as const;
