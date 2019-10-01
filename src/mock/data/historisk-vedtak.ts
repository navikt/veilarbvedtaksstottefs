import { InnsatsgruppeType } from '../../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../../rest/data/vedtak';
import { JSONArray } from 'yet-another-fetch-mock';

const historisk: VedtakData[] & JSONArray = [
	{
		id: 2,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
		vedtakStatus: 'SENDT',
		sistOppdatert: '2019-04-03T12:58:43.716393+02:00',
		begrunnelse: 'herps derps herps',
		opplysninger: [],
		gjeldende: false,
		veilederEnhetId: '1337',
		veilederEnhetNavn: 'Gotham city',
		veilederIdent: 'Z007',
		dokumentInfoId: null,
		journalpostId: '123456',
		beslutter: 'Beslutter Besluttersen'
	},
	{
		id: 3,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakStatus: 'SENDT',
		opplysninger: [],
		sistOppdatert: '2018-08-05T09:55:43.716393+02:00',
		begrunnelse: 'herp derp',
		gjeldende: false,
		veilederEnhetId: '1337',
		veilederEnhetNavn: 'Gotham city',
		veilederIdent: 'Z007',
		beslutter: 'Beslutter Besluttersen',
		dokumentInfoId: '98765',
		journalpostId: '5678'
	}
];

export default historisk;
