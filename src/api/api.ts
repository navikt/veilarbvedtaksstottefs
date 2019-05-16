import axios from 'axios';
import { SkjemaData } from '../pages/skjema/skjema';

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

class Api {

    static lagNyttVedtakUtkast(fnr: string) {
        return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`);
    }

    static putVedtakUtkast(fnr: string, skjema: SkjemaData) {
        return axios.put(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`, skjema);
    }

    static hentVedtak(fnr: string) {
        return axios.get(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak`);
    }

    static hentForhandsvisningURL(fnr: string) {
        return `${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast/pdf`;
    }

    static sendVedtak (fnr: string) {
        return axios.post(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/vedtak/send`);
    }

    static slettUtkast(fnr: string) {
        return axios.delete(`${VEILARBVEDTAKSSTOTTE_API}/${fnr}/utkast`);
    }

}

export default Api;
