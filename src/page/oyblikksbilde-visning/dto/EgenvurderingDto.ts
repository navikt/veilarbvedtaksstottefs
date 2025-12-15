export interface EgenvurderingDto {
	sistOppdatert: string | null;
	svar: Svar[];
}

interface Svar {
	spm: string | null;
	svar: string | null;
	oppfolging: string | null;
	dialogId: string | null;
}

export interface EgenvurderingV2Dto {
	egenvurderingId: string;
	sendtInnTidspunkt: string;
	dialogId: number | null;
	sporsmal: string;
	svar: string;
}
