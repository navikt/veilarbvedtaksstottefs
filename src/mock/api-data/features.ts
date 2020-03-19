import { JSONObject } from 'yet-another-fetch-mock';
import {
	Features,
	PRELANSERING_INFO_OM_LOSNING_TOGGLE,
	PRELANSERING_TOGGLE,
	STOPPE_VEDTAKSUTSENDING_TOGGLE,
} from '../../rest/data/features';

const features: Features & JSONObject = {
	[PRELANSERING_TOGGLE]: false,
	[PRELANSERING_INFO_OM_LOSNING_TOGGLE]: true,
	[STOPPE_VEDTAKSUTSENDING_TOGGLE]: false
};

export default features;
