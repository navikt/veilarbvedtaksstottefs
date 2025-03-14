import { AxiosPromise } from 'axios';
import { axiosInstance } from './utils';

export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering-info-om-losning';
export const HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE =
	'veilarbvedtaksstotte.gjorHovedmalSkaffeArbeidTilgjengeligForBrukereUtenArbeidssokerperiode';
export const NYTT_GJELDENDE_14A_VEDTAK_PAA = 'veilarbvedtaksstottefs.nytt-gjeldende-14a-endepunkt-paa';
export const ALL_TOGGLES = [
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE,
	NYTT_GJELDENDE_14A_VEDTAK_PAA
];

export interface FeatureToggles {
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[HOVEDMAL_SKAFFE_ARBEID_UAVHENGIG_AV_ARBEIDSSOKERPERIODE]: boolean;
	[NYTT_GJELDENDE_14A_VEDTAK_PAA]: boolean;
}

export function fetchFeaturesToggles(): AxiosPromise<FeatureToggles> {
	const features = ALL_TOGGLES.map(element => 'feature=' + element).join('&');
	return axiosInstance.get<FeatureToggles>(`/obo-unleash/api/feature?${features}`);
}
