import { JSONObject } from 'yet-another-fetch-mock';
import OppfolgingData from '../../rest/data/oppfolging-data';

const oppfolgingData: OppfolgingData & JSONObject = {
	reservasjonKRR: false,
	underOppfolging: true
};

export default oppfolgingData;
