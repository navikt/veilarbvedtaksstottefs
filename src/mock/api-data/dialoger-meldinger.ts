import { JSONArray } from 'yet-another-fetch-mock';
import { DialogMelding } from '../../rest/data/dialog-melding';
import { innloggetVeileder } from './innlogget-veileder';
import { beslutter } from '../personer';
import { MeldingType, MeldingUnderType } from '../../utils/types/dialog-melding-type';

const dialogeMeldinger: DialogMelding[] & JSONArray = [
	{
		melding: null,
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent:  innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		meldingUnderType: MeldingUnderType.UTKAST_OPPRETTET,
		meldingType: MeldingType.SYSTEM
	},
	{
		melding: 'Kan du sjekke om alt ser greit ut?',
		opprettet: '2020-02-05T09:55:43.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		meldingUnderType: null,
		meldingType: MeldingType.MANUELL
	},
	{
		melding: 'Kanskje du burde skrive litt mer utfyllende i begrunnelsen. Ellers så ser det bra ut :)',
		opprettet: '2020-02-06T12:37:44.716393+02:00',
		opprettetAvIdent: beslutter.ident,
		opprettetAvNavn: beslutter.navn,
		meldingUnderType: null,
		meldingType: MeldingType.MANUELL
	},
	{
		melding: null,
		opprettet: '2020-02-07T09:47:13.716393+02:00',
		opprettetAvIdent:  innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		meldingUnderType: MeldingUnderType.BESLUTTER_PROSESS_STARTET,
		meldingType: MeldingType.SYSTEM
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn,
		meldingUnderType: null,
		meldingType: MeldingType.MANUELL
	}
];

export default dialogeMeldinger;