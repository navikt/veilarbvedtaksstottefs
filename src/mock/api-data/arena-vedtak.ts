import { JSONArray } from 'yet-another-fetch-mock';
import { ArenaVedtakData } from '../../rest/data/arena-vedtak';
import { InnsatsgruppeType } from '../../rest/data/vedtak';

const vedtakFraArena: ArenaVedtakData[] & JSONArray = [
	{
		journalpostId: '11223344',
		dokumentInfoId: '44556677',
		journalforendeEnhet: '1234',
		journalfortAvNavn: 'Nordman, Ola',
		datoOpprettet: '2019-01-12T09:56:28',
		erGjeldende: true,
		gjeldendeInnsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS
	},
	{
		journalpostId: '22334455',
		dokumentInfoId: '66778899',
		journalforendeEnhet: '1234',
		journalfortAvNavn: 'Nordman, Ola',
		datoOpprettet: '2018-11-15T12:35:51',
		erGjeldende: false,
		gjeldendeInnsatsgruppe: null
	}
];

export default vedtakFraArena;