import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import { Oyblikksbilde } from '../../util/type/oyblikksbilde';
import { Vedtak, VEILARBVEDTAKSSTOTTE_API } from './index';

export interface ArenaVedtak {
	journalpostId: string;
	dokumentInfoId: string;
	dato: string;
}

export function hentFattedeVedtak(fnr: string): AxiosPromise<Vedtak[]> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-fattet`, { fnr });
}

export function hentArenaVedtak(fnr: string): AxiosPromise<ArenaVedtak[]> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-arena`, { fnr });
}

export function hentOyblikksbilde(vedtakId: number): AxiosPromise<Oyblikksbilde[]> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde`);
}

export function lagHentVedtakPdfUrl(vedtakId: number): string {
	return `${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/pdf`;
}

export function lagHentOyeblikksbildePdfUrl(vedtakId: number, oyeblikksbildeType: string): string {
	return `${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/${oyeblikksbildeType}/pdf`;
}

export function lagHentArenaVedtakPdfUrl(dokumentInfoId: string, journalpostId: string): string {
	return `${VEILARBVEDTAKSSTOTTE_API}/vedtak/arena/pdf?dokumentInfoId=${dokumentInfoId}&journalpostId=${journalpostId}`;
}

export function lagHentForhandsvisningUrl(vedtakId: number): string {
	return `${VEILARBVEDTAKSSTOTTE_API}/utkast/${vedtakId}/pdf`;
}
