import { HovedmalType, InnsatsgruppeType, Vedtak, VedtakStatus } from '../../../rest/data/vedtak';
import { veileder1, veileder3 } from '../../veiledere-mock';
import { enhetId, enhetNavn } from '../../konstanter';

const historisk: Vedtak[] = [
	{
		id: 1234,
		hovedmal: HovedmalType.BEHOLDE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.VARIG_TILPASSET_INNSATS,
		vedtakStatus: VedtakStatus.SENDT,
		sistOppdatert: '2018-08-05T09:55:43.716393+02:00',
		begrunnelse: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'+
			'Secundum durationem temporis speciem numeri ex sequentibus statim Unitates\n' +
			'- listepunkt 1\n' +
			'- listepunkt 2\n' +
			'- listepunkt 3\n' +
			'- listepunkt 4\n' +
			'- listepunkt 5',
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'CV-en/jobbprofilen din på nav.no',
			'Svarene dine om behov for veiledning'
		],
		gjeldende: false,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		dokumentInfoId: null,
		journalpostId: '123456',
		beslutterIdent: null,
		beslutterNavn: null,
		beslutterProsessStatus: null
	},
	{
		id: 1235,
		hovedmal: HovedmalType.SKAFFE_ARBEID,
		innsatsgruppe: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS,
		vedtakStatus: VedtakStatus.SENDT,
		opplysninger: [
			'Svarene dine fra da du registrerte deg',
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
		],
		sistOppdatert: '2019-12-12T12:58:43.716393+02:00',
		begrunnelse: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
			'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
			'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' +
			'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n'+
			'Secundum durationem temporis speciem numeri ex sequentibus statim Unitates\n' +
			'- listepunkt 1\n' +
			'- listepunkt 2\n' +
			'- listepunkt 3\n' +
			'- listepunkt 4\n' +
			'- listepunkt 5',
		gjeldende: false,
		veilederNavn: veileder1.navn,
		veilederIdent: veileder1.ident,
		oppfolgingsenhetId: enhetId,
		oppfolgingsenhetNavn: enhetNavn,
		dokumentInfoId: '98765',
		journalpostId: '5678',
		beslutterIdent: veileder3.ident,
		beslutterNavn: veileder3.navn,
		beslutterProsessStatus: null
	}
];

export default historisk;
