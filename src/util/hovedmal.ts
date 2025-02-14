import { OrNothing } from './type/ornothing';
import { HovedmalType } from '../api/veilarbvedtaksstotte';
import { EMDASH } from './index';

export const getHovedmalNavnEllerEmdash = (hovedmal: OrNothing<HovedmalType>) => {
	if (hovedmal) {
		return hovedmalTekst[hovedmal];
	}

	return EMDASH;
};

export const hovedmalTekst: { [key in HovedmalType]: string } = {
	[HovedmalType.SKAFFE_ARBEID]: 'Skaffe arbeid',
	[HovedmalType.BEHOLDE_ARBEID]: 'Beholde arbeid'
};
