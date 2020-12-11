import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { MeldingType, SystemMeldingType } from '../../util/type/melding-type';
import { VEILARBVEDTAKSSTOTTE_API } from './index';

export interface Melding {
	opprettet: string;
	type: MeldingType;
}

export interface DialogMelding extends Melding {
	melding: string;
	opprettetAvIdent: string;
	opprettetAvNavn: string;
}

export interface SystemMelding extends Melding {
	utfortAvIdent: string;
	utfortAvNavn: string;
	systemMeldingType: SystemMeldingType;
}

export function sendDialog(vedtakId: number, melding: string): AxiosPromise {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/meldinger?vedtakId=${vedtakId}`, { melding });
}

export function hentMeldinger(vedtakId: number): AxiosPromise<(DialogMelding | SystemMelding)[]> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/meldinger?vedtakId=${vedtakId}`);
}
