import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';
import { ArbeidssokerPeriode } from '@navikt/arbeidssokerregisteret-utils';
import { BEHANDLINGSNUMMER } from '../util/constants';

const behandlingsnummer = BEHANDLINGSNUMMER;

export enum MalformType {
	nb = 'nb',
	nn = 'nn'
}

export interface MalformData {
	malform: MalformType | null;
}

export interface Navn {
	fornavn: string;
	mellomnavn: string;
	etternavn: string;
	forkortetNavn: string;
}

export function fetchMalform(fnr: string): AxiosPromise<MalformData> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-malform`, { fnr });
}

export function fetchAktivArbeidssokerperiode(fnr: string): AxiosPromise<ArbeidssokerPeriode> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-siste-aktiv-arbeidssoekerperiode`, { fnr });
}

export function fetchNavn(fnr: string): AxiosPromise<Navn> {
	return axiosInstance.post(`/veilarbperson/api/v3/person/hent-navn`, { fnr, behandlingsnummer });
}
