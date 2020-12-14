import { RequestHandlersList } from 'msw/lib/types/setupWorker/glossary';
import { rest } from 'msw';
import {
	HovedmalType,
	InnsatsgruppeType,
	Vedtak,
	VedtakStatus,
	VEILARBVEDTAKSSTOTTE_API
} from '../../../api/veilarbvedtaksstotte';
import { enhetId, enhetNavn, veileder1, veileder3 } from '../../data';
import { ArenaVedtak } from '../../../api/veilarbvedtaksstotte/vedtak';
import { Oyblikksbilde } from '../../../util/type/oyblikksbilde';
import OyblikksbildeType from '../../../util/type/oyblikksbilde-type';

const historisk: Vedtak[] = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakStatus: VedtakStatus.SENDT,
		sistOppdatert: '2018-08-05T09:55:43.716393+02:00',
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
		beslutterNavn: null,
		beslutterProsessStatus: null
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
		vedtakStatus: VedtakStatus.SENDT,
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
		],
		sistOppdatert: '2019-12-12T12:58:43.716393+02:00',
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
		gjeldende: false,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		dokumentInfoId: '98765',
		journalpostId: '5678',
		beslutterIdent: veileder3.ident,
		beslutterNavn: veileder3.navn,
		beslutterProsessStatus: null
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

export const fattedeVedtakMock = historisk;

export const vedtakHandlers: RequestHandlersList = [
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(fattedeVedtakMock));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(vedtakFraArena));
	}),
	rest.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/:vedtakId/oyeblikksbilde`, (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(oyblikksbilder));
	})
];
