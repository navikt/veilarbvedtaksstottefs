import { innloggetVeileder } from './innlogget-veileder';
import { MeldingType, SystemMeldingType } from '../../util/type/melding-type';
import { DialogMelding, SystemMelding } from '../../api/veilarbvedtaksstotte/meldinger';
import { veileder3 } from '../data';

const dialogMeldinger: DialogMelding[] = [
	{
		melding: 'Kan du sjekke om alt ser greit ut?',
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Kanskje du burde skrive litt mer utfyllende i begrunnelsen. Ellers så ser det bra ut :)',
		opprettet: '2020-02-06T12:37:44.716393+02:00',
		opprettetAvIdent: veileder3.ident,
		opprettetAvNavn: veileder3.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Wow, dette var en awsome nettside! https://navikt.github.io/veilarbvedtaksstottefs',
		opprettet: '2020-02-08T14:24:10.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		type: MeldingType.DIALOG_MELDING
	}
];

const systemMeldinger: SystemMelding[] = [
	{
		systemMeldingType: SystemMeldingType.UTKAST_OPPRETTET,
		opprettet: '2020-02-05T09:47:01.716393+02:00',
		utfortAvIdent: innloggetVeileder.ident,
		utfortAvNavn: innloggetVeileder.navn,
		type: MeldingType.SYSTEM_MELDING
	},
	{
		systemMeldingType: SystemMeldingType.BLITT_BESLUTTER,
		opprettet: '2020-02-06T12:36:37.716393+02:00',
		utfortAvIdent: veileder3.ident,
		utfortAvNavn: veileder3.navn,
		type: MeldingType.SYSTEM_MELDING
	}
];

const meldinger = [...dialogMeldinger, ...systemMeldinger];

export default meldinger;
