import { BodyShort, Box, Heading, List } from '@navikt/ds-react';

export const KilderTipsInnhold = () => {
	return (
		<div>
			<Heading level="3" size="xsmall">
				Kilder
			</Heading>
			<BodyShort size="small">For andre kilder kan du for eksempel skrive:</BodyShort>
			<Box marginBlock="space-16" asChild>
				<List size="small">
					<List.Item>Referat fra møte med veilederen din 1. januar 20xx</List.Item>
					<List.Item>Dialogmeldinger i aktivitetsplanen fra 1. til 20. februar 20xx</List.Item>
					<List.Item>Sluttrapporten fra Tiltaksarrangør AS 1. september 20xx</List.Item>
				</List>
			</Box>
		</div>
	);
};
