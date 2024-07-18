import { List } from '@navikt/ds-react';

export const InnsatsgruppeTipsInnhold = () => {
	return (
		<List size="small" title="Innsatsgruppe" description="Innsatsbegrepene er nye. Her ser du de gamle:">
			<List.Item>gode muligheter = standardinnsats</List.Item>
			<List.Item>trenger veiledning = situasjonsbestemt innsats</List.Item>
			<List.Item>trenger veiledning, nedsatt arbeidsevne = spesielt tilpasset innsats</List.Item>
			<List.Item>jobbe delvis = delvis, varig tilpasset innsats</List.Item>
			<List.Item>liten mulighet til å jobbe = varig tilpasset innsats</List.Item>
		</List>
	);
};
