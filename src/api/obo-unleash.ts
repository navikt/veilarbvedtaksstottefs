import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering-info-om-losning';
export const HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE =
	'veilarbvedtaksstotte.gjorHovedmalSkaffeArbeidTilgjengeligForBrukereUtenArbeidssokerperiode';
export const VIS_VEDTAKSLOSNING_14_A = 'veilarbvedtaksstotte.visVedtakslosning14a';

export const ALL_TOGGLES = [
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE,
	VIS_VEDTAKSLOSNING_14_A
];

export interface FeatureToggles {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE]: boolean;
	[VIS_VEDTAKSLOSNING_14_A]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return axiosInstance.get<FeatureToggles>(`/obo-unleash/api/feature?${features}`);
}
