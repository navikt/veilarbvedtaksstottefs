import { AxiosRequestConfig } from 'axios';

export const FEATURE_TOGGLE_URL = '/veilarbpersonflatefs/api/feature';

export const PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const VEDTAK_I_GOSYS_TOGGLE = 'veilarbvedtaksstottefs.vedtakigosys';
export const ALL_TOGGLES = [PRELANSERING_TOGGLE, VEDTAK_I_GOSYS_TOGGLE];

export interface Features {
    [PRELANSERING_TOGGLE]: boolean;
    [VEDTAK_I_GOSYS_TOGGLE]: boolean;
}
class FeatureToggleApi {

    static lagHentFeaturesConfig(): AxiosRequestConfig {
        const toggles = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
        return {
            url: `${FEATURE_TOGGLE_URL}/?${toggles}`
        };
    }

}

export default FeatureToggleApi;
