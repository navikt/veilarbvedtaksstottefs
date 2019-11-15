import { InnsatsgruppeType } from '../../../components/skjema/innsatsgruppe/innsatsgruppe';
import { HovedmalType } from '../../../components/skjema/hovedmal/hovedmal';
import { VedtakData } from '../../../rest/data/vedtak';
import { JSONArray } from 'yet-another-fetch-mock';
import { innloggetVeileder } from '../innlogget-veileder';

const historisk: VedtakData[] & JSONArray = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
		vedtakStatus: 'SENDT',
		sistOppdatert: '2019-04-03T12:58:43.716393+02:00',
		begrunnelse: 'herps derps herps',
		opplysninger: [],
		gjeldende: false,
		veilederNavn: innloggetVeileder.navn,
		veilederIdent: innloggetVeileder.ident,
		veilederEnhetId: innloggetVeileder.enhetId,
		veilederEnhetNavn: innloggetVeileder.enhetNavn,
		dokumentInfoId: null,
		journalpostId: '123456',
		beslutterNavn: 'Beslutter Besluttersen',
		sendtTilBeslutter: false
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakStatus: 'SENDT',
		opplysninger: [],
		sistOppdatert: '2018-08-05T09:55:43.716393+02:00',
		begrunnelse: 'herp derp',
		gjeldende: false,
		veilederNavn: innloggetVeileder.navn,
		veilederIdent: innloggetVeileder.ident,
		veilederEnhetId: innloggetVeileder.enhetId,
		veilederEnhetNavn: innloggetVeileder.enhetNavn,
		beslutterNavn: 'Beslutter Besluttersen',
		dokumentInfoId: '98765',
		journalpostId: '5678',
		sendtTilBeslutter: false
	}
];

export default historisk;
