import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export enum MalformType {
	NB = 'NB', // Fjernes når TPS skal saneres
	NN = 'NN', // Fjernes når TPS skal saneres
	nb = 'nb',
	nn = 'nn'
}

export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string, hentMalformFraPdlFeature: boolean): AxiosPromise<MalformData> {
	if (hentMalformFraPdlFeature) {
		return axiosInstance.get(`/veilarbperson/api/v2/person/malform?fnr=${fnr}`);
	} else {
		return axiosInstance.get(`/veilarbperson/api/person/${fnr}/malform`);
	}
}
