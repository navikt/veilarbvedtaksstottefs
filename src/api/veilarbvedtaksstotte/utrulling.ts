import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

export function fetchTilhorerBrukerUtrulletEnhet(fnr: string): AxiosPromise<boolean> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/utrulling/tilhorerBrukerUtrulletKontor?fnr=${fnr}`);
}
