import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export enum MalformType {
	NB = 'NB',
	NN = 'NN'
}

export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.get(`/veilarbperson/api/person/${fnr}/malform`);
}
