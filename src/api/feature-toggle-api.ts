import { AxiosRequestConfig } from 'axios';

export const FEATURE_TOGGLE_URL = '/veilarbvedtaksstottefs/api/feature';

export const PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const ALL_TOGGLES = [PRELANSERING_TOGGLE];

export interface Features {
    [PRELANSERING_TOGGLE]: boolean;
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
