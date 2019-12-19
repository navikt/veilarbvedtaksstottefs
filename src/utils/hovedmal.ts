import { OrNothing } from './types/ornothing';
import { EMDASH } from './index';
import { HovedmalType } from '../rest/data/vedtak';

export const getHovedmalNavn = (hovedmal: OrNothing<HovedmalType>) => {
	const hovedmalobjekt = alleHovedmal.find(h => h.value === hovedmal);
	return (hovedmalobjekt && hovedmalobjekt.label) || EMDASH;
};

export const alleHovedmal = [
	{
		label: 'Skaffe arbeid',
		value: HovedmalType.SKAFFE_ARBEID
	},
	{
		label: 'Beholde arbeid',
		value: HovedmalType.BEHOLDE_ARBEID
	}
];