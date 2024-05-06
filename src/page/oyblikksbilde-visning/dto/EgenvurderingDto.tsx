export interface EgenvurderingDto {
	sistOppdatert: string | null;
	svar: Svar[];
}

interface Svar {
	spm: String | null;
	svar: String | null;
	oppfolging: String | null;
	dialogId: String | null;
}
