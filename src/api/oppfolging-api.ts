import { AxiosRequestConfig } from 'axios';

export const OPPFOLGING_URL = '/veilarboppfolging/api';

class OppfolgingApi {

    static lagUnderOppfolgingConfig(fnr: string): AxiosRequestConfig {
        return {
            url: `${OPPFOLGING_URL}/underoppfolging?fnr=${fnr}`
        };
    }

}

export default OppfolgingApi;
