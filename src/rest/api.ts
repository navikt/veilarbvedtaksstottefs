import { FetchInfo } from './utils';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';
import { ALL_TOGGLES } from './data/features';
import { BeslutterOppgaveData } from '../components/modal/beslutter-oppgave-modal/beslutter-oppgave-modal-innhold';
import { mapOpplysningerFraBokmalTilBrukersMalform } from '../components/skjema/skjema-utils';
import { MalformType } from './data/malform';

export interface SendDialogFetchParams {
	fnr: string;
	tekst: string;
}

export interface FnrFetchParams {
	fnr: string;
}

export interface EnhetIdFetchParams {
	enhetId: string;
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

export interface SendVedtakFetchParams {
	fnr: string;
	beslutterNavn?: string;
}

export type OpprettBeslutterOppgaveFetchParams = BeslutterOppgaveData & {
	fnr: string;
};

export const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';
export const VEILARBOPPFOLGING_API = '/veilarboppfolging/api';
export const VEILARBPERSON_API = '/veilarbperson/api';
export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';
export const VEILARBVEILEDER_API = '/veilarbveileder/api';

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

export const lagHentVeiledereFetchInfo = (params: EnhetIdFetchParams): FetchInfo => ({
	url: `${VEILARBVEILEDER_API}/enhet/${params.enhetId}/veiledere`
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

export const lagSendVedtakFetchInfo = (params: SendVedtakFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/vedtak/send`,
	method: 'POST',
	body: JSON.stringify({ beslutterNavn: params.beslutterNavn })
});

export const lagSendDialogFetchInfo = (params: SendDialogFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/beslutter/melding`,
	method: 'POST',
	body: JSON.stringify({ tekst: params.tekst })
});

export const lagHentDialogerFetchInfo = (params: FnrFetchParams): FetchInfo => ({
	url: `${VEILARBVEDTAKSSTOTTE_API}/${params.fnr}/beslutter/melding`
});

export const lagOpprettBeslutterOppgaveFetchInfo = (params: OpprettBeslutterOppgaveFetchParams): FetchInfo => {
	const {fnr, ...rest} = params;
	return {
		url: `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/beslutter/send`,
		method: 'POST',
		body: JSON.stringify(rest)
	};
};

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
