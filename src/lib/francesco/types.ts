export type FrancescoCasellaTipo = 'traccia' | 'tracciato';

export type FrancescoCasella = {
	id: string;
	tipo: FrancescoCasellaTipo;
	slug: string | null;
	imageUrl: string | null;
	href: string | null;
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
