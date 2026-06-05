export type AboutSection = {
	titolo: string;
	corpo: string;
};

export type AboutContent = {
	intro: string;
	tracce: AboutSection;
	tracciati: AboutSection;
	fotoTracceUrl: string;
	fotoTracciatiUrl: string;
	percorsoTracceSvg: string;
	percorsoTracciatiSvg: string;
};
