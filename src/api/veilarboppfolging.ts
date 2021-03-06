import TilgangTilBrukersKontor from '../util/type/tilgang-til-brukers-kontor';
import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export default interface OppfolgingData {
	reservasjonKRR: boolean;
	underOppfolging: boolean;
}

export function fetchOppfolging(fnr: string): AxiosPromise<OppfolgingData> {
	return axiosInstance.get(`/veilarboppfolging/api/oppfolging?fnr=${fnr}`);
}

export function fetchTilgangTilBrukersKontor(fnr: string): AxiosPromise<TilgangTilBrukersKontor> {
	return axiosInstance.get(`/veilarboppfolging/api/oppfolging/veilederTilgang?fnr=${fnr}`);
}
