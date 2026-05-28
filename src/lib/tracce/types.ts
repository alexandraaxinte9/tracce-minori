export type Frase = {
	orario: string;
	frase: string;
};

export type TracciaContent = {
	slug: string;
	titolo: string;
	frasi: Frase[];
	percorsoSvg: string;
};

export type TracciaSummary = {
	slug: string;
	titolo: string;
};
