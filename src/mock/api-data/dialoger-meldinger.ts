import { JSONArray } from 'yet-another-fetch-mock';
import { DialogMelding } from '../../rest/data/dialog-melding';
import { beslutter, ikkeAnsvarligVeileder, innloggetVeileder } from './veiledere';

const dialogeMeldinger: DialogMelding[] & JSONArray = [
	{
		tekst: 'Dette er skrevet av meg',
		dato: '2018-08-05T09:55:43.716393+02:00',
		skrevetAvIdent: innloggetVeileder.ident,
		skrevetAvNavn: innloggetVeileder.navn
	},
	{
		tekst: 'Dette er melding fra en annen veileder',
		dato: '2019-10-15T14:25:23.716393+02:00',
		skrevetAvIdent: ikkeAnsvarligVeileder.ident,
		skrevetAvNavn: ikkeAnsvarligVeileder.navn
	},
	{
		tekst: 'Dette er en melding fra en beslutter',
		dato: '2020-02-01T12:37:44.716393+02:00',
		skrevetAvIdent: beslutter.ident,
		skrevetAvNavn: beslutter.navn
	},
	{
		tekst: 'Dette er skrevet av meg',
		dato: '2018-08-05T09:55:43.716393+02:00',
		skrevetAvIdent: innloggetVeileder.ident,
		skrevetAvNavn: innloggetVeileder.navn
	},
	{
		tekst: 'Dette er melding fra en annen veileder',
		dato: '2019-10-15T14:25:23.716393+02:00',
		skrevetAvIdent: ikkeAnsvarligVeileder.ident,
		skrevetAvNavn: ikkeAnsvarligVeileder.navn
	},
	{
		tekst: 'Dette er en melding fra en beslutter',
		dato: '2020-02-01T12:37:44.716393+02:00',
		skrevetAvIdent: beslutter.ident,
		skrevetAvNavn: beslutter.navn
	}
];

export default dialogeMeldinger;