/**
 * Tavola 1440×900 — coordinate allineate allo screen di riferimento.
 * Regola left/top/right/bottom se sposti un asset nel mockup.
 */
export const ARTBOARD = {
	width: 1440,
	height: 900
} as const;

export const homeLayout = {
	header: {
		paddingTop: 24,
		paddingX: 36
	},
	/** logotipo.png — centrato nella pagina */
	hero: {
		left: 443,
		top: 286,
		width: 555
	},
	/** Sotto la riga «TRACCE», allineato a sinistra come nello screen */
	tagline: {
		left: 452,
		top: 428,
		fontSize: 11,
		letterSpacing: '0.1em'
	},
	illustrations: {
		topLeft: { left: -84, top: 48, width: 407, height: 590 },
		topRight: { right: -14, top: 52, width: 449, height: 340 },
		bottomLeft: { left: -78, bottom: -46, width: 366, height: 482 },
		bottomRight: { right: -60, bottom: -34, width: 503, height: 425 }
	}
} as const;
