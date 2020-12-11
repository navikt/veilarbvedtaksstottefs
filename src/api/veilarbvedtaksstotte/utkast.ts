import { MalformType } from '../veilarbperson';
import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { mapOpplysningerFraBokmalTilBrukersMalform, SkjemaData } from '../../util/skjema-utils';
import { VEILARBVEDTAKSSTOTTE_API, Vedtak, BeslutterProsessStatus } from './index';

export interface BeslutterprosessStatusData {
	status: BeslutterProsessStatus;
}

export function oppdaterVedtakUtkast(vedtakId: number, malform: MalformType | null, skjema: SkjemaData): AxiosPromise {
	skjema.opplysninger = mapOpplysningerFraBokmalTilBrukersMalform(skjema.opplysninger, malform);
	return axiosInstance.put(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}`, skjema);
}

export function fattVedtak(vedtakId: number): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/fattVedtak`);
}

export function slettUtkast(vedtakId: number): AxiosPromise {
	return axiosInstance.delete(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}`);
}

export function beslutterprosessStatus(vedtakId: number): AxiosPromise<BeslutterprosessStatusData> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/beslutterprosessStatus`);
}

export function fetchTaOverUtkast(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/overta`);
}

export function lagNyttUtkast(fnr: string): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/utkast`, { fnr });
}

export function fetchUtkast(fnr: string): AxiosPromise<Vedtak> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/utkast?fnr=${fnr}`);
}
