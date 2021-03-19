import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering.info-om-losning';
export const STOPPE_VEDTAKSUTSENDING_TOGGLE = 'veilarbvedtaksstottefs.stoppevedtaksutsending';
export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const SKRU_AV_POLLING_UTKAST = 'veilarbvedtaksstottefs.skru_av_polling_utkast';
export const SKRU_AV_POLLING_DIALOG = 'veilarbvedtaksstottefs.skru_av_polling_dialog';
export const PERSONALIA_DATA_FRA_PDL = 'veilarbmaofs.personalia.pdl.persondata';

export const ALL_TOGGLES = [
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	STOPPE_VEDTAKSUTSENDING_TOGGLE,
	PILOT_TOGGLE,
	SKRU_AV_POLLING_UTKAST,
	SKRU_AV_POLLING_DIALOG,
	PERSONALIA_DATA_FRA_PDL
];

export interface FeatureToggles {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: boolean;
	[PILOT_TOGGLE]: boolean;
	[SKRU_AV_POLLING_UTKAST]: boolean;
	[SKRU_AV_POLLING_DIALOG]: boolean;
	[PERSONALIA_DATA_FRA_PDL]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');

	return axiosInstance.get<FeatureToggles>(`/veilarbpersonflatefs/api/feature?${features}`);
}
