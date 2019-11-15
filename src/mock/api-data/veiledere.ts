import { JSONObject } from 'yet-another-fetch-mock';
import { VeiledereData } from '../../rest/data/veiledere';
import { innloggetVeileder } from './innlogget-veileder';

const veiledere: VeiledereData & JSONObject = {
	enhet: {
		enhetId: innloggetVeileder.enhetId,
		navn: innloggetVeileder.enhetNavn
	},
	veilederListe: [
		{
			'ident': 'Z104760',
			'navn': 'Sørlie, Maria',
			'fornavn': 'Maria',
			'etternavn': 'Sørlie'
		},
		{
			'ident': 'Z116129',
			'navn': 'Lunde, Håkon',
			'fornavn': 'Håkon',
			'etternavn': 'Lunde'
		},
		{
			'ident': 'Z913998',
			'navn': 'Holm, Isak',
			'fornavn': 'Isak',
			'etternavn': 'Holm'
		},
		{
			'ident': 'Z104599',
			'navn': 'Johnsen, Amalie',
			'fornavn': 'Amalie',
			'etternavn': 'Johnsen'
		},
		{
			'ident': 'Z960649',
			'navn': 'Vegge, Nikolai',
			'fornavn': 'Nikolai',
			'etternavn': 'Vegge'
		}
	]
};

export default veiledere;
