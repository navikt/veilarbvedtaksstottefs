import { OrNothing } from './type/ornothing';
import { InnsatsgruppeType } from '../api/veilarbvedtaksstotte';

export const erStandard = (innsatsgruppe: OrNothing<InnsatsgruppeType>): boolean => {
	return innsatsgruppe === InnsatsgruppeType.STANDARD_INNSATS;
};

export const erVarigEllerGradertVarig = (innsatsgruppe: OrNothing<InnsatsgruppeType>): boolean => {
	return (
		innsatsgruppe === InnsatsgruppeType.VARIG_TILPASSET_INNSATS ||
		innsatsgruppe === InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
	);
};

export const innsatsgruppeTekst: { [key in InnsatsgruppeType]: string } = {
	[InnsatsgruppeType.STANDARD_INNSATS]: 'Gode muligheter',
	[InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS]: 'Trenger veiledning',
	[InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS]: 'Trenger veiledning, nedsatt arbeidsevne',
	[InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS]: 'Jobbe delvis',
	[InnsatsgruppeType.VARIG_TILPASSET_INNSATS]: 'Liten mulighet til å jobbe'
};
