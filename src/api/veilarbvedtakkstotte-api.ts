import axios, { AxiosPromise } from 'axios';
import { SkjemaData } from '../pages/skjema/skjema';
import { VedtakData } from '../utils/types/vedtak';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export interface VeilarbVedtakkstotteApi {
    putVedtakUtkast: (fnr: string, skjema: SkjemaData) => AxiosPromise<void>;
    hentVedtak: (fnr: string) => AxiosPromise<VedtakData[]>;
    hentForhandsvisningURL: (fnr: string) => string; //bytearray??
    sendVedtak: (fnr: string) => AxiosPromise<void>;     //Egentligen DokumentSendtDTO meeen trenger vi dette??
    slettUtkast: (fnr: string) => AxiosPromise<void>;

}

function putVedtakUtkast(fnr: string, skjema: SkjemaData) {
    return axios.put(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`, skjema);
}

function hentVedtak(fnr: string) {
    return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`);
}

function hentForhandsvisningURL(fnr: string) {
    return `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`;
}

function sendVedtak (fnr: string) {
    return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/send`);
}

function slettUtkast(fnr: string) {
    return axios.delete(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`);
}

export default {
    putVedtakUtkast,
    hentVedtak,
    hentForhandsvisningURL,
    sendVedtak,
    slettUtkast,
} as VeilarbVedtakkstotteApi;
