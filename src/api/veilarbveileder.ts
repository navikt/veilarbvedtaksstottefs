import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export interface Veileder {
	fornavn: string;
	etternavn: string;
	navn: string;
	ident: string;
}

export function fetchInnloggetVeileder(): AxiosPromise<Veileder> {
	return axiosInstance.get(`/veilarbveileder/api/veileder/me`);
}
