import { JSONArray } from 'yet-another-fetch-mock';
import { DialogMelding } from '../../rest/data/dialog-melding';
import { innloggetVeileder } from './innlogget-veileder';
import { beslutter } from '../personer';

const dialogeMeldinger: DialogMelding[] & JSONArray = [
	{
		melding: 'UTKAST_OPPRETTET',
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent:  null,
		opprettetAvNavn: innloggetVeileder.navn
	},
	{
		melding: 'Kan du sjekke om alt ser greit ut?',
		opprettet: '2020-02-05T09:55:43.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn
	},
	{
		melding: 'Kanskje du burde skrive litt mer utfyllende i begrunnelsen. Ellers så ser det bra ut :)',
		opprettet: '2020-02-06T12:37:44.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn
	},
	{
		melding: 'BESLUTTER_PROSESS_STARTET',
		opprettet: '2020-02-07T09:47:13.716393+02:00',
		opprettetAvIdent:  null,
		opprettetAvNavn: innloggetVeileder.navn
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-08T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn
	}
];

export default dialogeMeldinger;