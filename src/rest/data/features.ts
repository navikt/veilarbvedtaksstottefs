export const PRELANSERING_TOGGLE = 'veilarbvedtaksstottefs.prelansering';
export const PRELANSERING_INFO_OM_LOSNING_TOGGLE = 'veilarbvedtaksstottefs.prelansering.info-om-losning';
export const STOPPE_VEDTAKSUTSENDING_TOGGLE = 'veilarbvedtaksstottefs.stoppevedtaksutsending';
export const PILOT_TOGGLE = 'pto.vedtaksstotte.pilot';
export const SKRU_AV_POLLING_UTKAST = 'veilarbvedtaksstottefs.skru_av_polling_utkast';
export const SKRU_AV_POLLING_DIALOG = 'veilarbvedtaksstottefs.skru_av_polling_dialog';

export const ALL_TOGGLES = [
	PRELANSERING_TOGGLE,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	STOPPE_VEDTAKSUTSENDING_TOGGLE,
	PILOT_TOGGLE,
	SKRU_AV_POLLING_UTKAST,
	SKRU_AV_POLLING_DIALOG
];

export interface Features {
	[PRELANSERING_TOGGLE]: boolean;
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: boolean;
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: boolean;
	[PILOT_TOGGLE]: boolean;
	[SKRU_AV_POLLING_UTKAST]: boolean;
	[SKRU_AV_POLLING_DIALOG]: boolean;
}
