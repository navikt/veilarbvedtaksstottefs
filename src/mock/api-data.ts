import OppfolgingData from '../api/veilarboppfolging';
import TilgangTilBrukersKontor from '../util/type/tilgang-til-brukers-kontor';
import { MalformData, MalformType } from '../api/veilarbperson';
import {
	FeatureToggles,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	SKRU_AV_POLLING_DIALOG,
	SKRU_AV_POLLING_UTKAST,
	STOPPE_VEDTAKSUTSENDING_TOGGLE,
	HENT_MALFORM_FRA_PDL
} from '../api/veilarbpersonflatefs';
import { Veileder } from '../api/veilarbveileder';
import { enhetId, enhetNavn, veileder1, veileder3 } from './data';
import { DialogMelding, SystemMelding } from '../api/veilarbvedtaksstotte/meldinger';
import { MeldingType, SystemMeldingType } from '../util/type/melding-type';
import { HovedmalType, InnsatsgruppeType, Utkast, Vedtak } from '../api/veilarbvedtaksstotte';
import { SkjemaData } from '../util/skjema-utils';
import env from '../util/environment';
import { ArenaVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { Oyblikksbilde } from '../util/type/oyblikksbilde';
import OyblikksbildeType from '../util/type/oyblikksbilde-type';

const tilgangTilBrukersKontor: TilgangTilBrukersKontor = {
	tilgangTilBrukersKontor: true
};

const oppfolgingData: OppfolgingData = {
	reservasjonKRR: false,
	underOppfolging: true
};

const malform: MalformData = {
	malform: MalformType.NB
};

const malformV2: MalformData = {
	malform: MalformType.NN
};

const features: FeatureToggles = {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: false,
	[SKRU_AV_POLLING_UTKAST]: false,
	[SKRU_AV_POLLING_DIALOG]: false,
	[HENT_MALFORM_FRA_PDL]: true
};

let innloggetVeileder: Veileder = {
	navn: veileder1.navn,
	ident: veileder1.ident,
	fornavn: 'Ola',
	etternavn: 'Nordmann'
};

const dialogMeldinger: DialogMelding[] = [
	{
		melding: 'Kan du sjekke om alt ser greit ut?',
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Kanskje du burde skrive litt mer utfyllende i begrunnelsen. Ellers så ser det bra ut :)',
		opprettet: '2020-02-06T12:37:44.716393+02:00',
		opprettetAvIdent: veileder3.ident,
		opprettetAvNavn: veileder3.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Wow, dette var en awsome nettside! https://navikt.github.io/veilarbvedtaksstottefs',
		opprettet: '2020-02-08T14:24:10.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	}
];

const systemMeldinger: SystemMelding[] = [
	{
		systemMeldingType: SystemMeldingType.UTKAST_OPPRETTET,
		opprettet: '2020-02-05T09:47:01.716393+02:00',
		utfortAvIdent: innloggetVeileder.ident,
		utfortAvNavn: innloggetVeileder.navn,
		type: MeldingType.SYSTEM_MELDING
	},
	{
		systemMeldingType: SystemMeldingType.BLITT_BESLUTTER,
		opprettet: '2020-02-06T12:36:37.716393+02:00',
		utfortAvIdent: veileder3.ident,
		utfortAvNavn: veileder3.navn,
		type: MeldingType.SYSTEM_MELDING
	}
];

const pabegyntUtkast: Utkast = {
	id: 100,
	hovedmal: HovedmalType.BEHOLDE_ARBEID,
	innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
	utkastSistOppdatert: '2019-05-07T10:22:32.98982+02:00',
	opplysninger: ['Svarene dine om behov for veiledning', 'En annen viktig opplysning'],
	veilederNavn: veileder1.navn,
	veilederIdent: veileder1.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse: 'Trenger ikke hjelp',
	beslutterIdent: null,
	beslutterNavn: null,
	beslutterProsessStatus: null
};

const historisk: Vedtak[] = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakFattet: '2018-08-05T09:55:43.716393+02:00',
		begrunnelse:
			'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
			'Secundum durationem temporis speciem numeri ex sequentibus statim Unitates\n' +
			'- listepunkt 1\n' +
			'- listepunkt 2\n' +
			'- listepunkt 3\n' +
			'- listepunkt 4\n' +
			'- listepunkt 5',
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'CV-en/jobbprofilen din på nav.no',
			'Svarene dine om behov for veiledning'
		],
		gjeldende: false,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		dokumentInfoId: null,
		journalpostId: '123456',
		beslutterIdent: null,
		beslutterNavn: null
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
		],
		vedtakFattet: '2019-12-12T12:58:43.716393+02:00',
		begrunnelse:
			'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n' +
			'Secundum durationem temporis speciem numeri ex sequentibus statim Unitates\n' +
			'- listepunkt 1\n' +
			'- listepunkt 2\n' +
			'- listepunkt 3\n' +
			'- listepunkt 4\n' +
			'- listepunkt 5',
		gjeldende: true,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		dokumentInfoId: '98765',
		journalpostId: '5678',
		beslutterIdent: veileder3.ident,
		beslutterNavn: veileder3.navn
	}
];

const vedtakFraArena: ArenaVedtak[] = [
	{
		journalpostId: '22334455',
		dokumentInfoId: '66778899',
		dato: '2018-11-15T12:35:51'
	}
];

const oyblikksbilder: Oyblikksbilde[] = [
	{
		oyeblikksbildeType: OyblikksbildeType.CV_OG_JOBBPROFIL,
		json: `{"sistEndret":"2019-01-28T18:36:16.647+01:00","synligForArbeidsgiver":true,"sistEndretAvNav":false,"sammendrag":"Svært liten arbeidserfaring. Vært til sjøs i ungdommen. Har satset på å livnære meg som forfatter. Det har ikke gått så bra økonimsik sett. Selv om jeg er en etablert lyriker. Men jeg har vanskelig for å se at jeg har noen andre muligheter. ","arbeidserfaring":[],"utdanning":[],"annenErfaring":[],"forerkort":[{"klasse":"B","fraDato":"1977-01-01","utloperDato":"2020-01-01"}],"kurs":[],"sertifikater":[],"sprak":[], "jobbprofil": {"sistEndret":"2019-01-28T18:36:16.666+01:00","onsketYrke":[{"tittel":"Barne- og ungdomsarbeider"},{"tittel":"Fritidsklubbassistent"}],"onsketArbeidssted":[{"stedsnavn":"Østfold"},{"stedsnavn":"Tromsø"},{"stedsnavn":"Aremark"}],"onsketAnsettelsesform":[{"tittel":"FAST"},{"tittel":"VIKARIAT"}],"onsketArbeidstidsordning":[{"tittel":"DAGTID"}],"heltidDeltid":{"heltid":true,"deltid":true},"kompetanse":[]}}`
	},
	{
		oyeblikksbildeType: OyblikksbildeType.REGISTRERINGSINFO,
		json: `{"type":"ORDINAER","registrering":{"manueltRegistrertAv":null,"id":884,"opprettetDato":"2020-01-16T12:59:46.883561+01:00","besvarelse":{"utdanning":"VIDEREGAENDE_GRUNNUTDANNING","utdanningBestatt":"JA","utdanningGodkjent":"JA","helseHinder":"NEI","andreForhold":"NEI","sisteStilling":"INGEN_SVAR","dinSituasjon":"DELTIDSJOBB_VIL_MER","fremtidigSituasjon":null,"tilbakeIArbeid":null},"teksterForBesvarelse":[{"sporsmalId":"sisteStilling","sporsmal":"Hva er din siste jobb?","svar":"Salgsmedarbeider i supermarked"},{"sporsmalId":"utdanning","sporsmal":"Hva er din høyeste fullførte utdanning?","svar":"Videregående grunnutdanning (1 til 2 år)"},{"sporsmalId":"utdanningBestatt","sporsmal":"Er utdanningen din bestått?","svar":"Ja"},{"sporsmalId":"utdanningGodkjent","sporsmal":"Er utdanningen din godkjent i Norge?","svar":"Ja"},{"sporsmalId":"dinSituasjon","sporsmal":"Velg den situasjonen som passer deg best","svar":"Har deltidsjobb, men vil jobbe mer"},{"sporsmalId":"helseHinder","sporsmal":"Har du helseproblemer som hindrer deg i å søke eller være i jobb?","svar":"Nei"},{"sporsmalId":"andreForhold","sporsmal":"Har du andre problemer med å søke eller være i jobb?","svar":"Nei"}],"sisteStilling":{"label":"Salgsmedarbeider i supermarked","konseptId":45518,"styrk08":"5223"},"profilering":{"jobbetSammenhengendeSeksAvTolvSisteManeder":true,"alder":30,"innsatsgruppe":"STANDARD_INNSATS"}}}`
	},
	{
		oyeblikksbildeType: OyblikksbildeType.EGENVURDERING,
		json: `{"besvarelseId":681,"sistOppdatert":"2020-02-07T12:45:51.342+01:00","svar":[{"spmId":"kontakt-fra-nav-veileder","besvarelseId":681,"svar":"Ja","spm":"Ønsker du å kontakte veilederen din for å komme videre med jobbsøkingen?","dato":"2020-02-07T12:45:25.329+01:00"},{"spmId":"hvilken-veiledning-trengs","besvarelseId":681,"svar":"Jeg trenger å bli bedre på å skrive CVer","spm":"Hva trenger du hjelp til i jobbsøkingen?","dato":"2020-02-07T12:45:51.342+01:00"}]}`
	}
];

let mockMeldinger = [...dialogMeldinger, ...systemMeldinger];

let utkast: Utkast | null = env.isRunningOnGhPages ? null : pabegyntUtkast;

const fattedeVedtak = historisk;

export function hentUtkast(): Utkast | null {
	return utkast;
}

export function hentMeldinger(): (DialogMelding | SystemMelding)[] {
	return mockMeldinger;
}

export function hentFattedeVedtak(): Vedtak[] {
	return fattedeVedtak;
}

export function hentTilgangTilBrukersKontor(): TilgangTilBrukersKontor {
	return tilgangTilBrukersKontor;
}

export function hentOppfolgingData(): OppfolgingData {
	return oppfolgingData;
}

export function hentMalform(): MalformData {
	return malform;
}

export function hentMalformV2(): MalformData {
	return malformV2;
}

export function hentArenaVedtak(): ArenaVedtak[] {
	return vedtakFraArena;
}

export function hentOyeblikksbilder(): Oyblikksbilde[] {
	return oyblikksbilder;
}

export function hentFeatures(): FeatureToggles {
	return features;
}

export function hentInnloggetVeileder(): Veileder {
	return innloggetVeileder;
}

export function oppdaterUtkast(delvisUtkast: Partial<Utkast>) {
	if (utkast) {
		utkast = Object.assign({}, utkast, delvisUtkast);
	}
}

export function leggTilMelding(melding: DialogMelding | SystemMelding) {
	mockMeldinger.push(melding);
}

export function leggTilFattetVedtak(vedtak: Vedtak) {
	fattedeVedtak.push(vedtak);
}

export function fjernAlleMockMeldinger() {
	mockMeldinger = [];
}

export function leggTilMockSystemMelding(systemMeldingType: SystemMeldingType) {
	const nyMelding: SystemMelding = {
		opprettet: new Date().toISOString(),
		systemMeldingType,
		type: MeldingType.SYSTEM_MELDING,
		utfortAvIdent: innloggetVeileder.ident,
		utfortAvNavn: innloggetVeileder.navn
	};

	mockMeldinger.push(nyMelding);
}

export function oppdaterVedtakUtkastMockFraSkjema(skjemaData: SkjemaData) {
	if (utkast) {
		utkast.begrunnelse = skjemaData.begrunnelse;
		utkast.hovedmal = skjemaData.hovedmal;
		utkast.innsatsgruppe = skjemaData.innsatsgruppe;
		utkast.opplysninger = skjemaData.opplysninger ? skjemaData.opplysninger : [];
	}
}

export function byttUtUtkast(nyttUtkast: Utkast | null) {
	utkast = nyttUtkast;
}

export function updateInnloggetVeilederMock(veileder: Veileder) {
	innloggetVeileder = {
		...innloggetVeileder,
		navn: veileder.navn,
		ident: veileder.ident
	};
}
