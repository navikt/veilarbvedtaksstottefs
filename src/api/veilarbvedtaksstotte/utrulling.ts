import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

export function fetchTilhorerBrukerUtrulletEnhet(fnr: string): AxiosPromise<boolean> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/utrulling/hent-tilhorerBrukerUtrulletKontor`, { fnr });
}
