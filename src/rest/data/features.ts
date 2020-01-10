export const PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering.info-om-losning';
export const STOPPE_VEDTAKSINNSENDING_TOGGLE = 'veilarbvedtaksstottefs.stoppevedtaksinnsending';

export const ALL_TOGGLES = [
	PRELANSERING_TOGGLE,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	STOPPE_VEDTAKSINNSENDING_TOGGLE
];

export interface Features {
	[PRELANSERING_TOGGLE]: boolean;
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[STOPPE_VEDTAKSINNSENDING_TOGGLE]: boolean;
}
