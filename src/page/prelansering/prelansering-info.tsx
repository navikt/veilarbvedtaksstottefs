import Card from '../../component/card/card';
import prelanseringBilde from './prelansering.png';
import { BodyShort, Heading } from '@navikt/ds-react';

const PrelanseringInfo = () => (
	<Card className="prelansering">
		<div className="prelansering__tekst">
			<Heading size="large" level="1" spacing>
				Her kommer ny løsning for behovs- og arbeidsevnevurdering
			</Heading>
			<BodyShort spacing>
				Vi slår sammen oppfølgingsvedtaket (§14 a) og arbeidsevnevurderingen i en samlet løsning. Det betyr at
				for de av brukerne som skal ha en arbeidsevnevurdering, skrives denne i begrunnelsesfeltet i
				oppfølgingsvedtaket.
			</BodyShort>
			<BodyShort>
				Når den nye løsningen kommer skal vi ikke lenger skrive det tidligere arbeidsevnevurderingsdokumentet i
				Arena, og vi skal heller ikke fatte oppfølgingsvedtaket i Arena.
			</BodyShort>
		</div>
		<img src={prelanseringBilde} className="prelansering__bilde" alt="Visning av ny løsning for vedtaksstøtte" />
	</Card>
);

export default PrelanseringInfo;
