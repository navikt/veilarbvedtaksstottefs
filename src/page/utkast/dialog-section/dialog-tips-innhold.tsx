import { BodyShort, Heading } from '@navikt/ds-react';

export const DialogTipsInnhold = () => {
	return (
		<>
			<Heading size="small" level="3" spacing>
				Kvalitetssikring
			</Heading>
			<BodyShort size="small" spacing>
				Når du vurderer at bruker har liten mulighet til å jobbe eller bare kan jobbe delvis, skal vurderingen
				din kvalitetssikres. Hensikten er at du får tilbakemeldinger på skjønnsvurderingene du har gjort og at
				konklusjonen blir riktig.
			</BodyShort>
			<BodyShort size="small">
				Dialogen kan gjøres tilgjengelig i behandling av klager og innsynsbegjæringer. Når vedtaket er fattet
				vil ikke dialogen være synlig i løsningen.
			</BodyShort>
		</>
	);
};
