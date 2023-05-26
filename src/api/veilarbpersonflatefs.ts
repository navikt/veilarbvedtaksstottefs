import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering.info-om-losning';
export const STOPPE_VEDTAKSUTSENDING_TOGGLE = 'veilarbvedtaksstottefs.stoppevedtaksutsending';

export const ALL_TOGGLES = [PRELANSERING_INFO_OM_LOSNING_TOGGLE, STOPPE_VEDTAKSUTSENDING_TOGGLE];

export interface FeatureToggles {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return axiosInstance.get<FeatureToggles>(`/veilarbpersonflatefs/api/feature?${features}`);
}
