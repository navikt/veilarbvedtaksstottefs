import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export enum MalformType {
	NB = 'NB',
	NN = 'NN'
}

export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string, hentMalformFraPdl: boolean): AxiosPromise<MalformData> {
	if (hentMalformFraPdl) {
		return axiosInstance.get(`/veilarbperson/api/v2/person/malform?fnr=${fnr}`);
	} else {
		return axiosInstance.get(`/veilarbperson/api/person/malform?fnr=${fnr}`);
	}
}
