import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

export function fetchStartBeslutterProsess(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/start?vedtakId=${vedtakId}`);
}

export function avbrytBeslutterProsess(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/avbryt?vedtakId=${vedtakId}`);
}

export function bliBeslutter(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/bliBeslutter?vedtakId=${vedtakId}`);
}

export function godkjennVedtak(vedtakId: number): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/godkjenn?vedtakId=${vedtakId}`);
}

export function oppdaterBeslutterProsessStatus(vedtakId: number): AxiosPromise {
	return axiosInstance.put(`${VEILARBVEDTAKSSTOTTE_API}/beslutter/status?vedtakId=${vedtakId}`);
}
