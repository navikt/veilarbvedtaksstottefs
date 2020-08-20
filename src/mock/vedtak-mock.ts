import { HandlerArgument, JSONObject, ResponseData } from 'yet-another-fetch-mock';
import { BeslutterProsessStatus, Vedtak, VedtakStatus } from '../rest/data/vedtak';
import { Mock } from './mock-utils';
import utkast from './api-data/vedtak/utkast';
import historisk from './api-data/vedtak/tidligere-vedtak';
import { innloggetVeileder } from './api-data/innlogget-veileder';
import { VEILARBVEDTAKSSTOTTE_API } from '../rest/api';
import { fjernAlleMockMeldinger, leggTilMockSystemMelding } from './meldinger-mock';
import { SystemMeldingType } from '../utils/types/melding-type';
import { enhetId, enhetNavn } from './konstanter';
import env from '../utils/environment';
import { SkjemaData } from '../utils/skjema-utils';

export let vedtakUtkastMock = env.isRunningOnGhPages ? null : utkast;
const fattedeVedtak = historisk;

export const mockHentUtkast: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast`,
	handler: async (): Promise<ResponseData> => {
		if (vedtakUtkastMock) {
			return { body: JSON.stringify(vedtakUtkastMock) };
		}
		return { status: 404 };
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
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast`,
	handler: async (): Promise<ResponseData> => {
		const nyttUtkast = {
			id: fattedeVedtak.length,
			vedtakStatus: 'UTKAST',
			sistOppdatert: '2019-05-07T10:22:32.98982+02:00',
			gjeldende: false,
			opplysninger: [],
			veilederNavn: innloggetVeileder.navn,
			veilederIdent: innloggetVeileder.ident,
			oppfolgingsenhetId: enhetId,
			oppfolgingsenhetNavn: enhetNavn,
			beslutterNavn: null,
			dokumentInfoId: null,
			journalpostId: null,
			sendtTilBeslutter: false,
			beslutterIdent: null
		} as unknown as Vedtak;

		vedtakUtkastMock = nyttUtkast as Vedtak & JSONObject;

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
		oppdaterVedtakUtkastMockFraSkjema(skjemaData);
		return { status: 204 };
	}
};

export const oppdaterVedtakUtkastMockFraSkjema = (skjemaData: SkjemaData) => {
	vedtakUtkastMock = Object.assign(vedtakUtkastMock || {}, skjemaData) as Vedtak & JSONObject;
};

export const mockSlettUtkast: Mock = {
	method: 'DELETE',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId`,
	handler: async (): Promise<ResponseData> => {
		vedtakUtkastMock = null;
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

		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast til beslutter');

		const fattetVedtak = {...vedtakUtkastMock};

		fattetVedtak.vedtakStatus = VedtakStatus.SENDT;
		fattetVedtak.gjeldende = true;
		fattetVedtak.dokumentInfoId = '123';
		fattetVedtak.journalpostId = '456';

		fattedeVedtak.push(fattetVedtak);
		vedtakUtkastMock = null;

		return { status: 204 };
	}
};

export const mockOvertaUtkast: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/overta`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å overta');

		vedtakUtkastMock.veilederIdent = innloggetVeileder.ident;
		vedtakUtkastMock.veilederNavn = innloggetVeileder.navn;

		leggTilMockSystemMelding(SystemMeldingType.TATT_OVER_SOM_VEILEDER);

		return { status: 204 };
	}
};

export const mockErUtkastGodkjent: Mock = {
	method: 'GET',
	url: `${VEILARBVEDTAKSSTOTTE_API}/utkast/:vedtakId/beslutterprosessStatus`,
	handler: async (): Promise<ResponseData> => {
		const data = {status: vedtakUtkastMock ? vedtakUtkastMock.beslutterProsessStatus : null};
		return { status: 200, body: JSON.stringify(data) };
	}
};

export const mockStartBeslutterprosess: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/start`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å starte beslutterprosess på');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_PROSESS_STARTET);

		return { status: 200 };
	}
};

export const mockBliBeslutter: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å bli beslutter for');

		vedtakUtkastMock.beslutterIdent = innloggetVeileder.ident;
		vedtakUtkastMock.beslutterNavn = innloggetVeileder.navn;

		leggTilMockSystemMelding(SystemMeldingType.BLITT_BESLUTTER);

		return { status: 204 };
	}
};

export const mockGodkjennVedtak: Mock = {
	method: 'POST',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å godkjenne');

		vedtakUtkastMock.beslutterProsessStatus = BeslutterProsessStatus.GODKJENT_AV_BESLUTTER;

		leggTilMockSystemMelding(SystemMeldingType.BESLUTTER_HAR_GODKJENT);

		return { status: 204 };
	}
};

export const mockOppdaterBeslutterProsessStatus: Mock = {
	method: 'PUT',
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/status`,
	handler: async (): Promise<ResponseData> => {
		if (!vedtakUtkastMock) throw new Error('Fant ikke utkast å oppdatere status på');

		const erBeslutter = vedtakUtkastMock.beslutterIdent === innloggetVeileder.ident;

		vedtakUtkastMock.beslutterProsessStatus = erBeslutter
			? BeslutterProsessStatus.KLAR_TIL_VEILEDER
			: BeslutterProsessStatus.KLAR_TIL_BESLUTTER;

		leggTilMockSystemMelding(
			erBeslutter
				? SystemMeldingType.SENDT_TIL_VEILEDER
				: SystemMeldingType.SENDT_TIL_BESLUTTER
		);

		return { status: 204 };
	}
};
