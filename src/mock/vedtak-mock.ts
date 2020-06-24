import { HandlerArgument, JSONObject, ResponseData } from 'yet-another-fetch-mock';
import { BeslutterProsessStatus, Vedtak } from '../rest/data/vedtak';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import { SkjemaData } from '../pages/utkast/utkast-side';
import historisk from './api-data/vedtak/tidligere-vedtak';
import { ansvarligVeileder, beslutter } from './personer';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import { fjernAlleMockMeldinger, leggTilMockSystemMelding } from './meldinger-mock';
import { SystemMeldingType } from '../utils/types/melding-type';
import { enhetId, enhetNavn } from './konstanter';
import env from '../utils/environment';

let vedtakUtkast = env.isRunningOnGhPages ? null : utkast;
const fattedeVedtak = historisk;

export const mockHentUtkast: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast`,
	handler: async (): Promise<ResponseData> => {
		return { body: JSON.stringify(vedtakUtkast) };
	}
};

export const mockHentFattedeVedtak: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet`,
	handler: async (): Promise<ResponseData> => {
		return { body: JSON.stringify(fattedeVedtak) };
	}
};

export const mockLagUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:fnr`,
	handler: async (): Promise<ResponseData> => {
		const nyttUtkast = {
			id: fattedeVedtak.length,
			vedtakStatus: 'UTKAST',
			sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			gjeldende: false,
			opplysninger: [],
			veilederNavn: ansvarligVeileder.navn,
			veilederIdent: ansvarligVeileder.ident,
			oppfolgingsenhetId: enhetId,
			oppfolgingsenhetNavn: enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false,
			beslutterIdent: null
		} as unknown as Vedtak;

		vedtakUtkast = nyttUtkast as Vedtak & JSONObject;

		fjernAlleMockMeldinger();

		leggTilMockSystemMelding(SystemMeldingType.UTKAST_OPPRETTET);

		return { status: 204 };
	}
};

export const mockOppdaterUtkast: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`,
	handler: async (args: HandlerArgument): Promise<ResponseData> => {
		const skjemaData: SkjemaData = args.body;
		vedtakUtkast = Object.assign(vedtakUtkast || {}, skjemaData) as Vedtak & JSONObject;
		return { status: 204 };
	}
};

export const mockSlettUtkast: Mock = {
	method: 'DELETE',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`,
	handler: async (): Promise<ResponseData> => {
		vedtakUtkast = null;
		return { status: 204 };
	}
};

export const mockFattVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/fattVedtak`,
	handler: async (): Promise<ResponseData> => {
		const gjeldendeVedtak = fattedeVedtak.find(v => v.gjeldende);

		if (gjeldendeVedtak) {
			gjeldendeVedtak.gjeldende = false;
		}

		if (!vedtakUtkast) throw new Error('Fant ikke utkast til beslutter');

		const fattetVedtak = {...vedtakUtkast};

		fattetVedtak.vedtakStatus = 'SENDT';
		fattetVedtak.gjeldende = true;
		fattetVedtak.dokumentInfoId = '123';
		fattetVedtak.journalpostId = '456';

		fattedeVedtak.push(fattetVedtak);
		vedtakUtkast = null;

		return { status: 204 };
	}
};

export const mockOvertaUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkast) throw new Error('Fant ikke utkast å overta');

		vedtakUtkast.oppfolgingsenhetNavn = enhetNavn;
		vedtakUtkast.oppfolgingsenhetId = enhetId;

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		return { status: 204 };
	}
};

export const mockKlarTilBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkast) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		vedtakUtkast.beslutterProsessStatus = BeslutterProsessStatus.KLAR_TIL_BESLUTTER;
		vedtakUtkast.beslutterIdent = null;
		vedtakUtkast.beslutterNavn = null;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		return { status: 200 };
	}
};

export const mockBliBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkast) throw new Error('Fant ikke utkast å bli beslutter for');

		vedtakUtkast.beslutterIdent = innloggetVeileder.ident;
		vedtakUtkast.beslutterIdent = innloggetVeileder.navn;

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		return { status: 204 };
	}
};

export const mockGodkjennVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkast) throw new Error('Fant ikke utkast å godkjenne');

		vedtakUtkast.beslutterProsessStatus = BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		return { status: 204 };
	}
};

export const mockOppdaterBeslutterProsessStatus: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkast) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = vedtakUtkast.beslutterIdent === beslutter.ident;

		vedtakUtkast.beslutterProsessStatus = erBeslutter
			? BeslutterProsessStatus.KLAR_TIL_VEILEDER
			: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		return { status: 204 };
	}
};
