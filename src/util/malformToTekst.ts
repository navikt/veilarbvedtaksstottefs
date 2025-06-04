import { OrNothing } from './type/ornothing';
import { MalformData, MalformType } from '../api/veilarbperson';

export function malformToTekst(malform: OrNothing<MalformData>): string {
	const malformType = malform ? malform.malform : null;

	switch (malformType) {
		case MalformType.en:
			return 'Engelsk';
		case MalformType.nb:
			return 'Norsk bokmål';
		case MalformType.nn:
			return 'Norsk nynorsk';
		case MalformType.se:
			return 'Nordsamisk';
		case null:
		default:
			return 'Språk/målform ikke kjent';
	}
}
