import { InnsatsgruppeType } from '../rest/data/vedtak';


export const getInnsatsgruppeTekst = (innsatsgruppeType: InnsatsgruppeType) => {
	return innsatsgruppeTekster.find(elem => elem.value === innsatsgruppeType) as InnsatsgruppeTekst;
};

export interface InnsatsgruppeTekst {
	tittel: string;
	undertekst: string;
	value: InnsatsgruppeType;
}

export const innsatsgruppeTekster: InnsatsgruppeTekst[] = [
	{
		tittel: 'Gode muligheter',
		undertekst: 'STANDARD INNSATS',
		value: InnsatsgruppeType.STANDARD_INNSATS
	},
	{
		tittel: 'Trenger veiledning',
		undertekst: 'SITUASJONSBESTEMT INNSATS',
		value: InnsatsgruppeType.SITUASJONSBESTEMT_INNSATS,
	},
	{
		tittel: 'Trenger veiledning, nedsatt arbeidsevne',
		undertekst: 'SPESIELT TILPASSET INNSATS',
		value: InnsatsgruppeType.SPESIELT_TILPASSET_INNSATS,
	},
	{
		tittel: 'Jobbe delvis',
		undertekst: 'DELVIS VARIG TILPASSET INNSATS',
		value: InnsatsgruppeType.GRADERT_VARIG_TILPASSET_INNSATS
	},
	{
		tittel: 'Liten mulighet til å jobbe',
		undertekst: 'VARIG TILPASSET INNSATS',
		value: InnsatsgruppeType.VARIG_TILPASSET_INNSATS
	},
];
