import { BodyShort, Box, Heading, List } from '@navikt/ds-react';

export const InnsatsgruppeTipsInnhold = () => {
	return (
		<div>
			<Heading level="3" size="xsmall">
				Innsatsgruppe
			</Heading>
			<BodyShort size="small">Innsatsbegrepene er nye. Her ser du de gamle:</BodyShort>
			<Box marginBlock="space-16" asChild>
				<List size="small">
					<List.Item>gode muligheter = standardinnsats</List.Item>
					<List.Item>trenger veiledning = situasjonsbestemt innsats</List.Item>
					<List.Item>trenger veiledning, nedsatt arbeidsevne = spesielt tilpasset innsats</List.Item>
					<List.Item>jobbe delvis = delvis, varig tilpasset innsats</List.Item>
					<List.Item>liten mulighet til å jobbe = varig tilpasset innsats</List.Item>
				</List>
			</Box>
		</div>
	);
};
