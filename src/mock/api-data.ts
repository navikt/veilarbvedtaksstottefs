import OppfolgingData from '../api/veilarboppfolging';
import TilgangTilBrukersKontor from '../util/type/tilgang-til-brukers-kontor';
import { MalformData, MalformType } from '../api/veilarbperson';
import { FeatureToggles, PRELANSERING_INFO_OM_LOSNING_TOGGLE } from '../api/obo-unleash';
import { Veileder } from '../api/veilarbveileder';
import { enhetId, enhetNavn, veileder1, veileder2, veileder3 } from './data';
import { DialogMelding, SystemMelding } from '../api/veilarbvedtaksstotte/meldinger';
import { MeldingType, SystemMeldingType } from '../util/type/melding-type';
import { HovedmalType, InnsatsgruppeType, Utkast, Vedtak } from '../api/veilarbvedtaksstotte';
import { SkjemaData } from '../util/skjema-utils';
import env from '../util/environment';
import { ArenaVedtak } from '../api/veilarbvedtaksstotte/vedtak';
import { OyblikksbildeCv, OyblikksbildeEgenvurdering, OyblikksbildeRegistrering } from '../util/type/oyblikksbilde';

const tilgangTilBrukersKontor: TilgangTilBrukersKontor = {
	tilgangTilBrukersKontor: true
};

const oppfolgingData: OppfolgingData = {
	reservasjonKRR: false,
	underOppfolging: true,
	inaktivIArena: false
};

const malformFraPdl: MalformData = {
	malform: MalformType.nn
};

const features: FeatureToggles = {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true
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
	veilederNavn: veileder2.navn,
	veilederIdent: veileder2.ident,
	oppfolgingsenhetId: enhetId,
	oppfolgingsenhetNavn: enhetNavn,
	begrunnelse:
		'På grunn av Sterk Mygg sin unge alder er det viktig at hun får hjelp til å komme i arbeid så raskt som mulig. Det vil ' +
		'sannsynligvis gi god effekt å finne en praksisplass i nærheten av hjemstedet slik at hun kan bo i nåværende bolig og lett komme seg ' +
		'til og fra arbeidsplassen.',
	beslutterIdent: null,
	beslutterNavn: null,
	beslutterProsessStatus: null
};

const historisk: Vedtak[] = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
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
			'CV-en/jobbønskene dine på nav.no',
			'Svarene dine om behov for veiledning'
		],
		gjeldende: false,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		beslutterIdent: null,
		beslutterNavn: null
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'CV-en/jobbønskene dine på nav.no',
			'Svarene dine om behov for veiledning'
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

const oyblikksbildeCV: OyblikksbildeCv = {
	data: JSON.parse(
		`{"sistEndret":"2024-04-03T14:44:25.425298+02:00","synligForArbeidsgiver":false,"sistEndretAvNav":true,"sammendrag":"Trivelig person med kjærlighet for sau, som har tonnevis med allsidig kompetanse og fantastiske personlige egenskaper.","arbeidserfaring":[{"tittel":"Sauepasser","arbeidsgiver":"Dolly gård","sted":"Sauda","beskrivelse":"Passe på at sauene har det bra.","fraDato":"2016-01-01","tilDato":"2019-12-31"},{"tittel":"Sauepasser","arbeidsgiver":"Dolly gård","sted":"Sauda  ","beskrivelse":"Passe på at sauene har det bra.","fraDato":"2016-01-01","tilDato":"2019-12-31"}],"utdanning":[{"tittel":"Bachelor i sauefag","utdanningsnivaa":"Høyere utdanning, 1-4 år","studiested":"Dolly Universitet","beskrivelse":"Studier innen sau og syntetiske data.","fraDato":"2012-08-10","tilDato":"2015-05-10"}],"fagdokumentasjoner":[{"tittel":"Svennebrev frisør","type":"SVENNEBREV_FAGBREV"},{"tittel":"Mesterbrev baker","type":"MESTERBREV"}],"godkjenninger":[{"tittel":"Godkjenning som profesjonell pyrotekniker","utsteder":"Dolly Pyroakademi","gjennomfortDato":"2017-12-31","utloperDato":"2027-12-31"}],"annenErfaring":[{"rolle":"Sauetrener","beskrivelse":"Mange års erfaring med trening av sau til utstillinger.","fraDato":"2010-05-01","tilDato":null}],"forerkort":[{"klasse":"C - Lastebil"}],"kurs":[{"tittel":"Kurs i saueklipping","arrangor":"Dolly Opplæringssenter","tidspunkt":"2022-07-30","varighet":{"varighet":2,"tidsenhet":"UKE"}},{"tittel":"Kurs i tennis","arrangor":"Dolly Opplæringssenter","tidspunkt":"2022-07-30","varighet":{"varighet":2,"tidsenhet":"UKE"}}],"sertifikater":[{"tittel":"Ballongførerbevis","utsteder":"Dolly Luftfart","gjennomfortDato":"2022-02-02","utloperDato":"2027-02-02"}],"andreGodkjenninger":[{"tittel":"Ballongførerbevis","utsteder":"Dolly Luftfart","gjennomfortDato":"2022-02-02","utloperDato":"2027-02-02"}],"sprak":[{"sprak":"Norsk","muntligNiva":"FOERSTESPRAAK","skriftligNiva":"FOERSTESPRAAK"},{"sprak":"Engelsk","muntligNiva":"GODT","skriftligNiva":"NYBEGYNNER"}],"jobbprofil":{"sistEndret":"2024-04-03T14:44:25.843844+02:00","onsketYrke":[{"tittel":"Frisør"},{"tittel":"Sauegjeter"},{"tittel":"Saueklipper"},{"tittel":"Ullklassifisør"}],"onsketArbeidssted":[{"stedsnavn":"Hamar"},{"stedsnavn":"Råde"},{"stedsnavn":"Vestby"}],"onsketAnsettelsesform":[{"tittel":"FAST"},{"tittel":"PROSJEKT"},{"tittel":"FERIEJOBB"}],"onsketArbeidstidsordning":[{"tittel":"DAGTID"},{"tittel":"KVELD"}],"onsketArbeidsdagordning":[{"tittel":"UKEDAGER"}],"onsketArbeidsskiftordning":[],"heltidDeltid":{"heltid":true,"deltid":false},"kompetanse":[{"tittel":"Fange dyr i feller"},{"tittel":"God fysikk"}],"oppstart":"LEDIG_NAA"}}`
	),
	journalfort: true
};

const oyblikksbildeRegistrering: OyblikksbildeRegistrering = {
	data: JSON.parse(
		`{"type":"ORDINAER","registrering":{"manueltRegistrertAv":{"ident":"O11111111","enhet":{"id":"1234","navn":"NAV Enhet"}},"id":884,"opprettetDato":"2020-01-16T12:59:46.883561+01:00","besvarelse":{"utdanning":"VIDEREGAENDE_GRUNNUTDANNING","utdanningBestatt":"JA","utdanningGodkjent":"JA","helseHinder":"NEI","andreForhold":"NEI","sisteStilling":"INGEN_SVAR","dinSituasjon":"DELTIDSJOBB_VIL_MER","fremtidigSituasjon":null,"tilbakeIArbeid":null},"teksterForBesvarelse":[{"sporsmalId":"sisteStilling","sporsmal":"Hva er din siste jobb?","svar":"Salgsmedarbeider i supermarked"},{"sporsmalId":"utdanning","sporsmal":"Hva er din høyeste fullførte utdanning?","svar":"Videregående grunnutdanning (1 til 2 år)"},{"sporsmalId":"utdanningBestatt","sporsmal":"Er utdanningen din bestått?","svar":"Ja"},{"sporsmalId":"utdanningGodkjent","sporsmal":"Er utdanningen din godkjent i Norge?","svar":"Ja"},{"sporsmalId":"dinSituasjon","sporsmal":"Velg den situasjonen som passer deg best","svar":"Har deltidsjobb, men vil jobbe mer"},{"sporsmalId":"helseHinder","sporsmal":"Har du helseproblemer som hindrer deg i å søke eller være i jobb?","svar":"Nei"},{"sporsmalId":"andreForhold","sporsmal":"Har du andre problemer med å søke eller være i jobb?","svar":"Nei"}],"sisteStilling":{"label":"Salgsmedarbeider i supermarked","konseptId":45518,"styrk08":"5223"},"profilering":{"jobbetSammenhengendeSeksAvTolvSisteManeder":true,"alder":30,"innsatsgruppe":"STANDARD_INNSATS"}}}`
	),
	journalfort: true
};

const oyblikksbildeEgenvurdering: OyblikksbildeEgenvurdering = {
	data: JSON.parse(
		`{"sistOppdatert":"2024-03-21T11:06:57.637Z","svar":[{"spm":"Hva slags veiledning ønsker du?","svar":"Jeg ønsker å klare meg selv","oppfolging":"STANDARD_INNSATS","dialogId":null}]}`
	),
	journalfort: true
};

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

export function hentMalformFraPdl(): MalformData {
	return malformFraPdl;
}

export function hentArenaVedtak(): ArenaVedtak[] {
	return vedtakFraArena;
}

export function hentCvOyeblikksbilde(): OyblikksbildeCv {
	return oyblikksbildeCV;
}

export function hentRegistreringOyeblikksbilde(): OyblikksbildeRegistrering {
	return oyblikksbildeRegistrering;
}

export function hentEgenvurderingOyeblikksbilde(): OyblikksbildeEgenvurdering {
	return oyblikksbildeEgenvurdering;
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
