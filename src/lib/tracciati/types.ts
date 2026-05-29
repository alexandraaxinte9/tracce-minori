export type TracciatoFoto = {
	id: string;
	url: string;
};

export type TracciatoContent = {
	slug: string;
	titolo: string;
	percorsoSvg: string;
	fotos: TracciatoFoto[];
	disegni: Record<string, string>;
};

export type TracciatoSummary = {
	slug: string;
	titolo: string;
};
