import { JSONArray } from 'yet-another-fetch-mock';
import { DialogMelding } from '../../rest/data/dialog-melding';
import { beslutter, innloggetVeileder } from './veiledere';

const dialogeMeldinger: DialogMelding[] & JSONArray = [
	{
		melding: 'Beslutter Besluttersen er beslutter',
		opprettet: '2020-02-05T09:47:13.716393+02:00',
		opprettetAvIdent: null,
		opprettetAvNavn: null
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
		opprettetAvIdent: beslutter.ident,
		opprettetAvNavn: beslutter.navn
	},
	{
		melding: 'Den er grei',
		opprettet: '2020-02-06T14:23:12.716393+02:00',
		opprettetAvIdent: innloggetVeileder.ident,
		opprettetAvNavn: innloggetVeileder.navn
	}
];

export default dialogeMeldinger;