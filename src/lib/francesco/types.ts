export type FrancescoCasellaTipo = 'traccia' | 'tracciato';

export type FrancescoCasella = {
	id: string;
	tipo: FrancescoCasellaTipo;
	slug: string;
	titolo: string;
	imageUrl: string | null;
	previewSvg: string;
	href: string;
};

export type FrancescoContent = {
	titolo: string;
	corpo: string;
	illustrazioneUrl: string;
	titoloSezioneTracce: string;
	titoloSezioneTracciati: string;
	caselleTracce: FrancescoCasella[];
	caselleTracciati: FrancescoCasella[];
};
