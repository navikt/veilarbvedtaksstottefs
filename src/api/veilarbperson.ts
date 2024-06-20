import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';

export enum MalformType {
	nb = 'nb',
	nn = 'nn'
}

export interface MalformData {
	malform: MalformType | null;
}

export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-malform`, { fnr });
}

export function fetchAktivArbeidssokerperiode(fnr: string): AxiosPromise<ArbeidssokerPeriode> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-siste-aktiv-arbeidssoekerperiode`, { fnr });
}
