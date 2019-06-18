import axios, { AxiosRequestConfig } from 'axios';
import { SkjemaData } from '../pages/vedtakskjema/vedtakskjema-side';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

class VedtaksstotteApi {

    static lagNyttVedtakUtkast(fnr: string) {
        return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`);
    }

    static putVedtakUtkast(fnr: string, skjema: SkjemaData) {
        return axios.put(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`, skjema);
    }

    static lagHentVedtakConfig(fnr: string): AxiosRequestConfig {
        return {
            url: `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`
        };
    }

    static hentVedtak(fnr: string) {
        return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`);
    }

    static hentForhandsvisningURL(fnr: string) {
        return `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`;
    }

    static sendVedtak (fnr: string, beslutter?: string) {
        return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/send`, { beslutter });
    }

    static slettUtkast(fnr: string) {
        return axios.delete(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`);
    }

    static hentVedtakPdfURL(fnr: string, dokumentInfoId: string, journalpostId: string) {
        return `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/pdf?dokumentInfoId=${dokumentInfoId}&journalpostId=${journalpostId}`;
    }

    static hentOyblikksbilde(fnr: string, vedtakId: number): AxiosRequestConfig {
        return {
            url: `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/oyblikksbilde/${vedtakId}`
        };
    }

}

export default VedtaksstotteApi;
