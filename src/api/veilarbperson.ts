import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export enum MalformType {
	nb = 'nb',
	nn = 'nn'
}

const behandlingsnummer = 'B642';
export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-malform`, { fnr, behandlingsnummer });
}
