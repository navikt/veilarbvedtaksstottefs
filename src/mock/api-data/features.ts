import { JSONObject } from 'yet-another-fetch-mock';
import {
	Features,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	PRELANSERING_TOGGLE,
	STOPPE_VEDTAKSUTSENDING_TOGGLE,
	PILOT_TOGGLE,
	SKRU_AV_POLLING_UTKAST,
	SKRU_AV_POLLING_DIALOG,
} from '../../rest/data/features';

const features: Features & JSONObject = {
	[PRELANSERING_TOGGLE]: false,
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: false,
	[PILOT_TOGGLE]: false,
	[SKRU_AV_POLLING_UTKAST]: false,
	[SKRU_AV_POLLING_DIALOG]: false
};

export default features;
