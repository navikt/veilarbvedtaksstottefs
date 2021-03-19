import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import * as url from 'url';

export enum MalformType {
	NB = 'NB',
	NN = 'NN'
}

export interface MalformData {
	malform: MalformType | null;
}
// V2 er data fra PDL (målform kommer fra DKIF)
export interface MalformDataV2 {
	malformV2: MalformType | null;
}
export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.get(`/veilarbperson/api/person/${fnr}/malform`);
}
export function fetchMalformV2(fnr: string): AxiosPromise<MalformDataV2> {
	return axiosInstance.get(`/veilarbperson/api/v2/person/${fnr}/malformV2`);
}
