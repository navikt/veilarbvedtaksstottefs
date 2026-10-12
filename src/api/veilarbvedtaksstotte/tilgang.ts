import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from '.';

export function fetchTilgangTilBrukersKontor(fnr: string): AxiosPromise<boolean> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v1/tilgang/hent-tilgang`, { fnr });
}
