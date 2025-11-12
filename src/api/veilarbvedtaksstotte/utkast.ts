import { MalformType } from '../veilarbperson';
import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { mapKilderFraBokmalTilBrukersMalform, SkjemaData } from '../../util/skjema-utils';
import { VEILARBVEDTAKSSTOTTE_API, BeslutterProsessStatus, Utkast, HovedmalType, InnsatsgruppeType } from './index';
import { FrontendEvent } from '../../util/logger';
import { OrNothing } from '../../util/type/ornothing';

export interface BeslutterprosessStatusData {
	status: BeslutterProsessStatus;
}

interface OppdaterVedtakUtkastRequest {
	opplysninger: string[] | undefined;
	hovedmal: OrNothing<HovedmalType>;
	innsatsgruppe: OrNothing<InnsatsgruppeType>;
	begrunnelse: OrNothing<string>;
}

export function oppdaterVedtakUtkast(vedtakId: number, malform: MalformType | null, skjema: SkjemaData): AxiosPromise {
	const request: OppdaterVedtakUtkastRequest = {
		opplysninger: mapKilderFraBokmalTilBrukersMalform(skjema.valgteKilder, malform).map(kilde => kilde.tekst),
		hovedmal: skjema.hovedmal,
		innsatsgruppe: skjema.innsatsgruppe,
		begrunnelse: skjema.begrunnelse
	};
	return axiosInstance.put(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}`, request);
}

export function fattVedtak(vedtakId: number): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/fattVedtak`);
}

export function slettUtkast(vedtakId: number): AxiosPromise {
	return axiosInstance.delete(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}`);
}

export function hentBeslutterprosessStatus(vedtakId: number): AxiosPromise<BeslutterprosessStatusData> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/beslutterprosessStatus`);
}

export function fetchTaOverUtkast(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/overta`);
}

export function lagNyttUtkast(fnr: string): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, { fnr });
}

export function fetchUtkast(fnr: string): AxiosPromise<Utkast> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/hent-utkast`, { fnr });
}

export function sendEventTilVeilarbvedtaksstotte(event: FrontendEvent) {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/logger/event`, event);
}
