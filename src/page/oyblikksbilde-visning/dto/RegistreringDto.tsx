export interface RegistreringDto {
	registrering: RegistreringsdataDto | null;
	type: BrukerRegistreringType | null;
}

interface RegistreringsdataDto {
	opprettetDato: string | null;
	besvarelse: BesvarelseSvar | null;
	teksterForBesvarelse: TekstForSporsmal[];
	sisteStilling: Stilling | null;
	profilering: Profilering | null;
	manueltRegistrertAv: Veileder | null;
	endretAv: string | null;
	endretTidspunkt: Date | null;
}

interface TekstForSporsmal {
	sporsmalId: string;
	sporsmal: string;
	svar: string;
}

interface Stilling {
	label: string | null;
	konseptId: number;
	styrk08: string | null;
}

interface Profilering {
	innsatsgruppe: ProfilertInnsatsgruppe | null;
	alder: number | null;
	jobbetSammenhengendeSeksAvTolvSisteManeder: boolean | null;
}

export enum ProfilertInnsatsgruppe {
	STANDARD_INNSATS = 'STANDARD_INNSATS',
	SITUASJONSBESTEMT_INNSATS = 'SITUASJONSBESTEMT_INNSATS',
	BEHOV_FOR_ARBEIDSEVNEVURDERING = 'BEHOV_FOR_ARBEIDSEVNEVURDERING'
}

interface NavEnhet {
	id: string;
	navn: string;
}

interface Veileder {
	ident: string | null;
	enhet: NavEnhet | null;
}

enum BrukerRegistreringType {
	ORDINAER,
	SYKMELDT
}

interface BesvarelseSvar {
	utdanning: UtdanningSvar | null;
	utdanningBestatt: UtdanningBestattSvar | null;
	utdanningGodkjent: UtdanningGodkjentSvar | null;
	helseHinder: HelseHinderSvar | null;
	andreForhold: AndreForholdSvar | null;
	sisteStilling: SisteStillingSvar | null;
	dinSituasjon: DinSituasjonSvar | null;
	fremtidigSituasjon: FremtidigSituasjonSvar | null;
	tilbakeIArbeid: TilbakeIArbeidSvar | null;
}

export enum UtdanningSvar {
	INGEN_UTDANNING = 'INGEN_UTDANNING',
	GRUNNSKOLE = 'GRUNNSKOLE',
	VIDEREGAENDE_GRUNNUTDANNING = 'VIDEREGAENDE_GRUNNUTDANNING',
	VIDEREGAENDE_FAGBREV_SVENNEBREV = 'VIDEREGAENDE_FAGBREV_SVENNEBREV',
	HOYERE_UTDANNING_1_TIL_4 = 'HOYERE_UTDANNING_1_TIL_4',
	HOYERE_UTDANNING_5_ELLER_MER = 'HOYERE_UTDANNING_5_ELLER_MER',
	INGEN_SVAR = 'INGEN_SVAR'
}

export enum UtdanningGodkjentSvar {
	JA = 'JA',
	NEI = 'NEI',
	VET_IKKE = 'VET_IKKE',
	INGEN_SVAR = 'INGEN_SVAR'
}

export enum UtdanningBestattSvar {
	JA = 'JA',
	NEI = 'NEI',
	INGEN_SVAR = 'INGEN_SVAR'
}

export enum TilbakeIArbeidSvar {
	JA_FULL_STILLING = 'JA_FULL_STILLING',
	JA_REDUSERT_STILLING = 'JA_REDUSERT_STILLING',
	USIKKER = 'USIKKER',
	NEI = 'NEI'
}

export enum SisteStillingSvar {
	HAR_HATT_JOBB = 'HAR_HATT_JOBB',
	HAR_IKKE_HATT_JOBB = 'HAR_IKKE_HATT_JOBB',
	INGEN_SVAR = 'INGEN_SVAR'
}

export enum HelseHinderSvar {
	JA = 'JA',
	NEI = 'NEI',
	INGEN_SVAR = 'INGEN_SVAR'
}

export enum FremtidigSituasjonSvar {
	SAMME_ARBEIDSGIVER = 'SAMME_ARBEIDSGIVER',
	SAMME_ARBEIDSGIVER_NY_STILLING = 'SAMME_ARBEIDSGIVER_NY_STILLING',
	NY_ARBEIDSGIVER = 'NY_ARBEIDSGIVER',
	USIKKER = 'USIKKER',
	INGEN_PASSER = 'INGEN_PASSER'
}

export enum DinSituasjonSvar {
	MISTET_JOBBEN = 'MISTET_JOBBEN',
	ALDRI_HATT_JOBB = 'ALDRI_HATT_JOBB',
	HAR_SAGT_OPP = 'HAR_SAGT_OPP',
	VIL_BYTTE_JOBB = 'VIL_BYTTE_JOBB',
	ER_PERMITTERT = 'ER_PERMITTERT',
	USIKKER_JOBBSITUASJON = 'USIKKER_JOBBSITUASJON',
	JOBB_OVER_2_AAR = 'JOBB_OVER_2_AAR',
	VIL_FORTSETTE_I_JOBB = 'VIL_FORTSETTE_I_JOBB',
	AKKURAT_FULLFORT_UTDANNING = 'AKKURAT_FULLFORT_UTDANNING',
	DELTIDSJOBB_VIL_MER = 'DELTIDSJOBB_VIL_MER',
	OPPSIGELSE = 'OPPSIGELSE',
	ENDRET_PERMITTERINGSPROSENT = 'ENDRET_PERMITTERINGSPROSENT',
	TILBAKE_TIL_JOBB = 'TILBAKE_TIL_JOBB',
	NY_JOBB = 'NY_JOBB',
	MIDLERTIDIG_JOBB = 'MIDLERTIDIG_JOBB',
	KONKURS = 'KONKURS',
	SAGT_OPP = 'SAGT_OPP',
	UAVKLART = 'UAVKLART',
	ANNET = 'ANNET'
}

export enum AndreForholdSvar {
	JA = 'JA',
	NEI = 'NEI',
	INGEN_SVAR = 'INGEN_SVAR'
}
