export interface CvDto {
	sistEndret: string | null;
	synligForArbeidsgiver: boolean | null;
	sistEndretAvNav: boolean | null;
	sammendrag: string | null;
	arbeidserfaring: ArbeidserfaringDtoV2[] | null;
	utdanning: UtdanningDtoV2[] | null;
	fagdokumentasjoner: FagdokumentasjonDtoV2[] | null;
	godkjenninger: GodkjenningDtoV2[] | null;
	annenErfaring: AnnenErfaringDtoV2[] | null;
	forerkort: ForerkortDtoV2[] | null;
	kurs: KursDtoV2[] | null;
	andreGodkjenninger: SertifikatDtoV2[] | null;
	sprak: SprakDtoV2[] | null;
	jobbprofil: FOJobbprofilDtoV2 | null;
}

export interface SprakDtoV2 {
	sprak: string | null;
	muntligNiva: SprakferdighetDtoV2 | null;
	skriftligNiva: SprakferdighetDtoV2 | null;
}

export enum SprakferdighetDtoV2 {
	IKKE_OPPGITT = 'IKKE_OPPGITT',
	NYBEGYNNER = 'NYBEGYNNER',
	GODT = 'GODT',
	VELDIG_GODT = 'VELDIG_GODT',
	FOERSTESPRAAK = 'FOERSTESPRAAK'
}

export interface KursDtoV2 {
	tittel: string | null;
	arrangor: string | null;
	tidspunkt: string | null;
	varighet: KursvarighetDtoV2 | null;
}

export interface KursvarighetDtoV2 {
	varighet: number | null;
	tidsenhet: KursVarighetEnhetDtoV2 | null;
}

export enum KursVarighetEnhetDtoV2 {
	TIME = 'TIME',
	DAG = 'DAG',
	UKE = 'UKE',
	MND = 'MND',
	UKJENT = 'UKJENT'
}

export interface ForerkortDtoV2 {
	klasse: string | null;
}

export interface AnnenErfaringDtoV2 {
	rolle: string | null;
	beskrivelse: string | null;
	fraDato: string | null;
	tilDato: string | null;
}

export interface GodkjenningDtoV2 {
	tittel: string | null;
	utsteder: string | null;
	gjennomfortDato: string | null;
	utloperDato: string | null;
}

export interface ArbeidserfaringDtoV2 {
	tittel: string | null;
	arbeidsgiver: string | null;
	sted: string | null;
	beskrivelse: string | null;
	fraDato: string | null;
	tilDato: string | null;
}

export interface UtdanningDtoV2 {
	tittel: string | null;
	utdanningsnivaa: string | null;
	studiested: string | null;
	beskrivelse: string | null;
	fraDato: string | null;
	tilDato: string | null;
}

export interface FagdokumentasjonDtoV2 {
	tittel: string | null;
	type: Fagdokument | null;
}

export enum Fagdokument {
	SVENNEBREV_FAGBREV = 'SVENNEBREV_FAGBREV',
	MESTERBREV = 'MESTERBREV',
	AUTORISASJON = 'AUTORISASJON'
}

export interface SertifikatDtoV2 {
	tittel: string | null;
	utsteder: string | null;
	gjennomfortDato: string | null;
	utloperDato: string | null;
}

export interface FOJobbprofilDtoV2 {
	sistEndret: string | null;
	onsketYrke: JobbprofilYrkeDtoV2[] | null;
	onsketArbeidssted: JobbprofilArbeidsstedDtoV2[] | null;
	onsketAnsettelsesform: JobbprofilAnsettelsesformDtoV2[] | null;
	onsketArbeidstidsordning: JobbprofilArbeidstidsordningDtoV2[] | null;
	onsketArbeidsdagordning: JobbprofilArbeidsdagordningDtoV2[] | null;
	onsketArbeidsskiftordning: JobbprofilArbeidsskiftordningDto[] | null;
	heltidDeltid: JobbprofilHeltidDeltidDtoV2 | null;
	kompetanse: KompetanseDtoV2[] | null;
	oppstart: string | null;
}

export interface JobbprofilYrkeDtoV2 {
	tittel: string;
}

export interface JobbprofilArbeidsstedDtoV2 {
	stedsnavn: string;
}

export interface JobbprofilAnsettelsesformDtoV2 {
	tittel: string | null;
}

export interface JobbprofilArbeidstidsordningDtoV2 {
	tittel: string | null;
}

export interface JobbprofilArbeidsdagordningDtoV2 {
	tittel: string | null;
}

export interface JobbprofilArbeidsskiftordningDto {
	tittel: string | null;
}

export interface JobbprofilHeltidDeltidDtoV2 {
	heltid: boolean;
	deltid: boolean;
}

export interface KompetanseDtoV2 {
	tittel: string;
}
