import { JSONArray } from 'yet-another-fetch-mock';
import { innloggetVeileder } from './innlogget-veileder';
import { beslutter } from '../personer';
import { DialogMelding, SystemMelding } from '../../rest/data/melding';
import { MeldingType, SystemMeldingType } from '../../utils/types/melding-type';

const dialogMeldinger: DialogMelding[] & JSONArray = [
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
		opprettetAvIdent: beslutter.ident,
		opprettetAvNavn: beslutter.navn,
		type: MeldingType.DIALOG_MELDING
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
	     type: MeldingType.DIALOG_MELDING
	}
];

const systemMeldinger: SystemMelding[] & JSONArray = [
	{
		systemMeldingType: SystemMeldingType.UTKAST_OPPRETTET,
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		utfortAvIdent:  innloggetVeileder.ident,
		utfortAvNavn: innloggetVeileder.navn,
		type: MeldingType.SYSTEM_MELDING
	},
	{
		systemMeldingType: SystemMeldingType.BLITT_BESLUTTER,
		opprettet: '2020-02-07T09:47:13.716393+02:00',
		utfortAvIdent: beslutter.ident,
		utfortAvNavn: beslutter.navn,
		type: MeldingType.SYSTEM_MELDING
	},
];

const meldinger: Array<DialogMelding | SystemMelding> & JSONArray = [...dialogMeldinger, ...systemMeldinger];

export default meldinger;
