import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

export interface Klagebehandling {
	vedtakId: number;
	fnr: string;
	veilederIdent: string;
}
export function lagreKlagebehandling(klagebehandling: Klagebehandling): AxiosPromise<Response> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/klagebehandling/opprett-klage`, klagebehandling);
}
