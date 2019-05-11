import axios, { AxiosPromise } from 'axios';
import { SkjemaData } from '../pages/skjema/skjema';
import { VedtakData } from '../utils/types/vedtak';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export interface VeilarbVedtakkstotteApi {
    putVedtakUtkast: (fnr: string, skjema: SkjemaData) => AxiosPromise<void>;
    hentVedtak: (fnr: string) => AxiosPromise<VedtakData[]>;
    hentForhandsvisning: (fnr: string) => AxiosPromise<any[]>; //bytearray??
    sendVedtak: (fnr: string) => AxiosPromise<void>;
    //Egentligen DokumentSendtDTO meeen trenger vi dette??
}

function putVedtakUtkast(fnr: string, skjema: SkjemaData) {
    return axios.put(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`, skjema);
}

function hentVedtak(fnr: string) {
    return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`);
}

function hentForhandsvisning(fnr: string) {
    return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`);
}

function sendVedtak (fnr: string) {
    return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/send`);
}

export default {
    putVedtakUtkast,
    hentVedtak,
    hentForhandsvisning,
    sendVedtak,
} as VeilarbVedtakkstotteApi;