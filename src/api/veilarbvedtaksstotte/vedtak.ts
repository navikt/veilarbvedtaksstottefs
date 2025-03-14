import { AxiosPromise } from 'axios';
import { axiosInstance } from '../utils';
import {
	OyblikksbildeArbeidssokerRegistret,
	OyblikksbildeCv,
	OyblikksbildeEgenvurdering,
	OyblikksbildeRegistrering
} from '../../util/type/oyblikksbilde';
import { Vedtak, VEILARBVEDTAKSSTOTTE_API } from './index';

export interface ArenaVedtak {
	journalpostId: string;
	dokumentInfoId: string;
	dato: string;
}

export function hentFattedeVedtak(fnr: string): AxiosPromise<Vedtak[]> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-fattet`, { fnr });
}
export function hentGjeldende14aVedtak(fnr: string): AxiosPromise<Vedtak> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/hent-gjeldende-14a-vedtak`, { fnr });
}

export function hentArenaVedtak(fnr: string): AxiosPromise<ArenaVedtak[]> {
	return axiosInstance.post(`${VEILARBVEDTAKSSTOTTE_API}/v2/vedtak/hent-arena`, { fnr });
}

export function hentCvOyblikksbilde(vedtakId: number): AxiosPromise<OyblikksbildeCv> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde-cv`);
}

export function hentRegistreringOyblikksbilde(vedtakId: number): AxiosPromise<OyblikksbildeRegistrering> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde-registrering`);
}

export function hentArbeidssokerRegistretOyblikksbilde(
	vedtakId: number
): AxiosPromise<OyblikksbildeArbeidssokerRegistret> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde-arbeidssokerRegistret`);
}

export function hentEgenvurderingOyblikksbilde(vedtakId: number): AxiosPromise<OyblikksbildeEgenvurdering> {
	return axiosInstance.get(`${VEILARBVEDTAKSSTOTTE_API}/vedtak/${vedtakId}/oyeblikksbilde-egenvurdering`);
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
