import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export enum MalformType {
	nb = 'nb',
	nn = 'nn'
}

export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.get(`/veilarbperson/api/v2/person/malform?fnr=${fnr}`);
}
