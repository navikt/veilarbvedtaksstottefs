import { JSONArray } from 'yet-another-fetch-mock';
import { ArenaVedtakData, InnsatsgruppeType } from '../../rest/data/vedtak';

const vedtakFraArena: ArenaVedtakData[] & JSONArray = [
	{
		journalpostId: '11223344',
		dokumentInfoId: '44556677',
		oppfolgingsenhetId: '1234',
		oppfolgingsenhetNavn: 'NAV Testheim',
		veilederNavn: 'Nordman, Ola',
		datoOpprettet: '2019-01-12T09:56:28',
		erGjeldende: true,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS
	},
	{
		journalpostId: '22334455',
		dokumentInfoId: '66778899',
		oppfolgingsenhetId: '1234',
		oppfolgingsenhetNavn: 'NAV Testheim',
		veilederNavn: 'Nordman, Ola',
		datoOpprettet: '2018-11-15T12:35:51',
		erGjeldende: false,
		innsatsgruppe: null
	}
];

export default vedtakFraArena;