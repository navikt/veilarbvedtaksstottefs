import { MalformData, MalformType } from '../../rest/data/malform';
import { JSONObject } from 'yet-another-fetch-mock';

const malform: MalformData & JSONObject = {
    malform: MalformType.NB
};

export default malform;
