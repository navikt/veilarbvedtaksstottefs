import { FetchInfo } from './utils';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';
import { ALL_TOGGLES } from './data/features';
import { mapOpplysningerFraBokmalTilBrukersMalform } from '../components/skjema/skjema-utils';
import { MalformType } from './data/malform';

export interface FnrFetchParams {
	fnr: string;
}

export interface HentOyblikksbildeFetchParams {
	fnr: string;
	vedtakId: number;
}

export interface OppdaterUtkastFetchParams {
	fnr: string;
	malform: MalformType | null;
	skjema: SkjemaData;
}

const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';
const VEILARBOPPFOLGING_API = '/veilarboppfolging/api';
const VEILARBPERSON_API = '/veilarbperson/api';
const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
const VEILARBVEILEDER_API = '/veilarbveileder/api';

export const lagHentFeaturesFetchInfo = (): FetchInfo => {
	const toggles = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return { url: `${FEATURE_TOGGLE_URL}/?${toggles}` };
};

export const lagHentOppfolgingDataFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBOPPFOLGING_API}/oppfolging?fnr=${params.fnr}`
});

export const lagHentTilgangTilKontorFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBOPPFOLGING_API}/oppfolging/veilederTilgang?fnr=${params.fnr}`
});

export const lagHentMalformFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBPERSON_API}/person/${params.fnr}/malform`
});

export const lagHentVeilederFetchInfo = (): FetchInfo => ({
	url: `${VEILARBVEILEDER_API}/veileder/me`
});

export const lagNyttVedtakUtkastFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
	method: 'POST'
});

export const lagOppdaterVedtakUtkastFetchInfo = (params: OppdaterUtkastFetchParams): FetchInfo => {
	params.skjema.opplysninger = mapOpplysningerFraBokmalTilBrukersMalform(params.skjema.opplysninger, params.malform);
	return {
		url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
		method: 'PUT',
		body: JSON.stringify(params.skjema)
	};
};

export const lagHentVedtakFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtak`
});

export const lagHentArenaVedtakFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtakFraArena`
});

export const lagSendVedtakFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtak/send`,
	method: 'POST',
});

export const lagSlettUtkastFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
	method: 'DELETE'
});

export const lagTaOverUtkastFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast/overta`,
	method: 'POST'
});

export const lagHentOyblikksbildeFetchInfo = (params: HentOyblikksbildeFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/oyblikksbilde/${params.vedtakId}`
});

export const lagHentForhandsvisningUrl = (fnr: string): string => `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`;

export const lagHentVedtakPdfUrl = (fnr: string, dokumentInfoId: string, journalpostId: string): string =>
	`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/pdf?dokumentInfoId=${dokumentInfoId}&journalpostId=${journalpostId}`;

export const lagStartBeslutterProsess = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/beslutter/start`,
	method: 'POST'
});