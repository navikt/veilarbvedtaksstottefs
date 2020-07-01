import { JSONArray } from 'yet-another-fetch-mock';
import { ArenaVedtak } from '../../rest/data/vedtak';

const vedtakFraArena: ArenaVedtak[] & JSONArray = [
	{
		journalpostId: '22334455',
		dokumentInfoId: '66778899',
		dato: '2018-11-15T12:35:51',
	}
];

export default vedtakFraArena;