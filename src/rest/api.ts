import { FetchInfo } from './utils';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';
import { ALL_TOGGLES } from './data/features';

export interface FnrFetchParams {
	fnr: string;
}

export interface HentOyblikksbildeFetchParams {
	fnr: string;
	vedtakId: number;
}

export interface OppdaterUtkastFetchParams {
	fnr: string;
	skjema: SkjemaData;
}

export interface SendVedtakFetchParams {
	fnr: string;
	beslutter?: string;
}

export interface OpprettBeslutterOppgaveFetchParams {
	aktivFra: string;
	frist: string;
	enhet: string;
	beskrivelse: string;
	beslutter?: string;
}

const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';
const OPPFOLGING_URL = '/veilarboppfolging/api';
const VEILARBPERSON_API = '/veilarbperson/api';
const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export const lagHentFeaturesFetchInfo = (): FetchInfo => {
	const toggles = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return { url: `${FEATURE_TOGGLE_URL}/?${toggles}` };
};

export const lagHentUnderOppfolgingFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${OPPFOLGING_URL}/underoppfolging?fnr=${params.fnr}`
});

export const lagHentTilgangTilKontorFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${OPPFOLGING_URL}/oppfolging/veilederTilgang?fnr=${params.fnr}`
});

export const lagHentMalformFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBPERSON_API}/person/${params.fnr}/malform`
});

export const lagNyttVedtakUtkastFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
	method: 'POST'
});

export const lagOppdaterVedtakUtkastFetchInfo = (params: OppdaterUtkastFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
	method: 'PUT',
	body: JSON.stringify(params.skjema)
});

export const lagHentVedtakFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtak`
});

export const lagSendVedtakFetchInfo = (params: SendVedtakFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtak/send`,
	method: 'POST',
	body: JSON.stringify({ beslutter: params.beslutter })
});

export const lagOpprettBeslutterOppgaveFetchInfo = (params: OpprettBeslutterOppgaveFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/beslutter/send`,
	method: 'POST',
	body: JSON.stringify({  ...params })
});

export const lagSlettUtkastFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/utkast`,
	method: 'DELETE'
});

export const lagHentOyblikksbildeFetchInfo = (params: HentOyblikksbildeFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/oyblikksbilde/${params.vedtakId}`
});

export const lagHentForhandsvisningUrl = (fnr: string): string => `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`;

export const lagHentVedtakPdfUrl = (fnr: string, dokumentInfoId: string, journalpostId: string): string =>
	`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/pdf?dokumentInfoId=${dokumentInfoId}&journalpostId=${journalpostId}`;
