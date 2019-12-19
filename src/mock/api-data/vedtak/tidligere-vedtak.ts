import { HovedmalType, InnsatsgruppeType, VedtakData } from '../../../rest/data/vedtak';
import { JSONArray } from 'yet-another-fetch-mock';
import { innloggetVeileder } from '../innlogget-veileder';

const historisk: VedtakData[] & JSONArray = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakStatus: 'SENDT',
		sistOppdatert: '2018-08-05T09:55:43.716393+02:00',
		begrunnelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
			'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'CV-en/jobbprofilen din på nav.no',
			'Svarene dine om behov for veiledning'
		],
		gjeldende: false,
		veilederNavn: innloggetVeileder.navn,
		veilederIdent: innloggetVeileder.ident,
		veilederEnhetId: innloggetVeileder.enhetId,
		veilederEnhetNavn: innloggetVeileder.enhetNavn,
		dokumentInfoId: null,
		journalpostId: '123456',
		beslutterNavn: 'Beslutter Besluttersen',
		sendtTilBeslutter: true
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.STANDARD_INNSATS,
		vedtakStatus: 'SENDT',
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		],
		sistOppdatert: '2019-12-12T12:58:43.716393+02:00',
		begrunnelse: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, ' +
			'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			' Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		gjeldende: false,
		veilederNavn: innloggetVeileder.navn,
		veilederIdent: innloggetVeileder.ident,
		veilederEnhetId: innloggetVeileder.enhetId,
		veilederEnhetNavn: innloggetVeileder.enhetNavn,
		beslutterNavn: null,
		dokumentInfoId: '98765',
		journalpostId: '5678',
		sendtTilBeslutter: false
	}
];

export default historisk;
