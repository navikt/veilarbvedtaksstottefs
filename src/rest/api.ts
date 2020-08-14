import { fetchJson, FetchResponse, fetchWithChecks, useFetch } from './utils';
import { ALL_TOGGLES, Features } from './data/features';
import { mapOpplysningerFraBokmalTilBrukersMalform, SkjemaData } from '../utils/skjema-utils';
import { MalformData, MalformType } from './data/malform';
import { ArenaVedtak, Vedtak } from './data/vedtak';
import { Veileder } from './data/veiledere';
import Oppfolging from './data/oppfolging-data';
import { DialogMelding, SystemMelding } from './data/melding';
import { Oyblikksbilde } from '../utils/types/oyblikksbilde';
import TilgangTilBrukersKontor from '../utils/types/tilgang-til-brukers-kontor';
import { ErGodkjent } from './data/er-godkjent';

export interface SendDialogPayload {
	vedtakId: number;
	melding: string;
}

export interface OppdaterUtkastPayload {
	vedtakId: number;
	malform: MalformType | null;
	skjema: SkjemaData;
}

export const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';
export const VEILARBOPPFOLGING_API = '/veilarboppfolging/api';
export const VEILARBPERSON_API = '/veilarbperson/api';
export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
export const VEILARBVEILEDER_API = '/veilarbveileder/api';

export const HEADERS_WITH_JSON_CONTENT = {
	'Content-Type': 'application/json'
};

export const useFetchFeatures = () => {
	const toggles = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return useFetch<Features>(`${FEATURE_TOGGLE_URL}/?${toggles}`)
}

export const useFetchOppfolging = (fnr: string) => useFetch<Oppfolging>(
	`${VEILARBOPPFOLGING_API}/oppfolging?fnr=${fnr}`, {depends: [fnr]}
);

export const useFetchTilgangTilKontor = (fnr: string) => useFetch<TilgangTilBrukersKontor>(
	`${VEILARBOPPFOLGING_API}/oppfolging/veilederTilgang?fnr=${fnr}`, {depends: [fnr]}
);

export const useFetchMalform = (fnr: string) => useFetch<MalformData>(
	`${VEILARBPERSON_API}/person/${fnr}/malform`, {depends: [fnr]}
);

export const useFetchInnloggetVeileder = () => useFetch<Veileder>(
	`${VEILARBVEILEDER_API}/veileder/me`
);

export const fetchLagNyttUtkast = (fnr: string): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, {
		method: 'POST',
		headers: HEADERS_WITH_JSON_CONTENT,
		body: JSON.stringify({fnr})
	});
};

export const useFetchUtkast = (fnr: string) => useFetch<Vedtak>(
	`${VEILARBVEDTAKSSTOTTE_API}/utkast?fnr=${fnr}`, {depends: [fnr]}
);

// TODO duplikat
export const fetchUtkast = (fnr: string): Promise<FetchResponse<Vedtak>> => fetchJson(
	`${VEILARBVEDTAKSSTOTTE_API}/utkast?fnr=${fnr}`
);

export const useFetchFattedeVedtak = (fnr: string) => useFetch<Vedtak[]>(
	`${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet?fnr=${fnr}`, {depends: [fnr]}
);

// TODO duplikat
export const fetchFattedeVedtak = (fnr: string): Promise<FetchResponse<Vedtak[]>> => fetchJson(
	`${VEILARBVEDTAKSSTOTTE_API}/vedtak/fattet?fnr=${fnr}`
);

export const useFetchArenaVedtak = (fnr: string) => useFetch<ArenaVedtak[]>(
	`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena?fnr=${fnr}`, {depends: [fnr]}
);

export const fetchOppdaterVedtakUtkast = (params: OppdaterUtkastPayload): Promise<Response> => {
	params.skjema.opplysninger = mapOpplysningerFraBokmalTilBrukersMalform(params.skjema.opplysninger, params.malform);
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${params.vedtakId}`,
		{
			method: 'PUT',
			headers: HEADERS_WITH_JSON_CONTENT,
			body: JSON.stringify(params.skjema)
		});
};

export const fetchFattVedtak = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/fattVedtak`, {
		method: 'POST'
	})
};

export const fetchSendDialog = (params: SendDialogPayload): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/meldinger?vedtakId=${params.vedtakId}`, {
		method: 'POST',
		headers: HEADERS_WITH_JSON_CONTENT,
		body: JSON.stringify({melding: params.melding})
	});
};

export const fetchMeldinger = (vedtakId: number): Promise<FetchResponse<Array<DialogMelding | SystemMelding>>> => {
	return fetchJson(`${VEILARBVEDTAKSSTOTTE_API}/meldinger?vedtakId=${vedtakId}`);
};

export const fetchSlettUtkast = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}`, {
		method: 'DELETE'
	});
};

export const fetchErUtkastGodkjent = (vedtakId: number): Promise<FetchResponse<ErGodkjent>> => {
	return fetchJson(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/erGodkjent`);
};

export const fetchTaOverUtkast = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/overta`, {
		method: 'POST'
	})
};

export const fetchOyblikksbilde = (vedtakId: number): Promise<FetchResponse<Oyblikksbilde[]>> => {
	return fetchJson(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde`);
};

export const lagHentForhandsvisningUrl = (vedtakId: number): string => `${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/pdf`;

export const lagHentVedtakPdfUrl = (vedtakId: number): string =>
	`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/pdf`;

export const lagHentArenaVedtakPdfUrl = (dokumentInfoId: string, journalpostId: string): string =>
	`${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena/pdf?dokumentInfoId=${dokumentInfoId}&journalpostId=${journalpostId}`;

export const fetchStartBeslutterProsess = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/start?vedtakId=${vedtakId}`, {
		method: 'POST'
	})
};

export const fetchBliBeslutter = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter?vedtakId=${vedtakId}`, {
		method: 'POST'
	})
};

export const fetchGodkjennVedtak = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn?vedtakId=${vedtakId}`, {
		method: 'POST'
	})
};

export const fetchOppdaterBeslutterProsessStatus = (vedtakId: number): Promise<Response> => {
	return fetchWithChecks(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/status?vedtakId=${vedtakId}`, {
		method: 'PUT'
	})
};
