import axios, { AxiosPromise } from 'axios';
import { SkjemaData } from '../pages/skjema/skjema';
import { VedtakData } from '../utils/types/vedtak';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export interface VeilarbVedtakkstotteApi {
    putVedtakUtkast: (fnr: string, skjema: SkjemaData) => AxiosPromise<void>;
    hentVedtak: (fnr: string) => AxiosPromise<VedtakData[]>;
}

function putVedtakUtkast(fnr: string, skjema: SkjemaData) {
    return axios.put(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`, skjema);
}

function hentVedtak(fnr: string) {
    return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`);

}

export default {
    putVedtakUtkast,
    hentVedtak,
} as VeilarbVedtakkstotteApi;