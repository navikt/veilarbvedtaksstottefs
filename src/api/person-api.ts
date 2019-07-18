import { AxiosRequestConfig } from 'axios';

export enum MalformType {
    NB = 'NB',
    NN = 'NN'
}

export interface MalformData {
    malform: MalformType | null;
}

export const VEILARBPERSON_API = '/veilarbperson/api';

class VeilarbpersonApi {

    static lagHentMalformConfig(fnr: string): AxiosRequestConfig {
        return {
            url: `${VEILARBPERSON_API}/person/${fnr}/malform`
        };
    }

}

export default VeilarbpersonApi;
