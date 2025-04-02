import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const EKSEMPELTOGGLE = 'togglenavn-eksempeltoggle';

export const ALL_TOGGLES = [EKSEMPELTOGGLE];

export interface FeatureToggles {
	[EKSEMPELTOGGLE]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return axiosInstance.get<FeatureToggles>(`/obo-unleash/api/feature?${features}`);
}
