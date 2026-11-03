import { BodyShort, Heading } from '@navikt/ds-react';

export const AutomatiskeKilderTipsInnhold = () => {
	return (
		<div>
			<Heading level="3" size="xsmall" spacing>
				Automatisk journalførte kilder
			</Heading>
			<BodyShort size="small">
				Dersom du har valgt en av disse kildene, og den finnes for denne brukeren, så blir kilden automatisk
				journalført. Du kan se journalført brukerinformasjon på vedtakstidspunktet når du går inn på gjeldende
				vedtak eller et tidligere vedtak.
			</BodyShort>
		</div>
	);
};
