import TilgangTilBrukersKontor from '../util/type/tilgang-til-brukers-kontor';
import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export default interface OppfolgingData {
	reservasjonKRR: boolean;
	underOppfolging: boolean;
	inaktivIArena: boolean;
}

export function fetchOppfolging(fnr: string): AxiosPromise<OppfolgingData> {
	return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/hent-status`, { fnr });
}

export function fetchTilgangTilBrukersKontor(fnr: string): AxiosPromise<TilgangTilBrukersKontor> {
	return axiosInstance.post(`/veilarboppfolging/api/v3/oppfolging/hent-veilederTilgang`, { fnr });
}
