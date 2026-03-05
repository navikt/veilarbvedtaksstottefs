import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const EKSEMPELTOGGLE = 'togglenavn-eksempeltoggle';
export const VIS_KLAGE_TOGGLE = 'veilarbvedtaksstottefs.vis_klage';
export const VIS_DARKMODE_TOGGLE = 'veilarbvedtaksstottefs.vis-darkmode-toggle';

export const ALL_TOGGLES = [EKSEMPELTOGGLE, VIS_KLAGE_TOGGLE, VIS_DARKMODE_TOGGLE];

export interface FeatureToggles {
	[EKSEMPELTOGGLE]: boolean;
	[VIS_KLAGE_TOGGLE]: boolean;
	[VIS_DARKMODE_TOGGLE]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return axiosInstance.get<FeatureToggles>(`/obo-unleash/api/feature?${features}`);
}
