import TilbakemeldingEkspanderbartpanel from '../tilbakemelding-ekspanderbartpanel/tilbakemelding-ekspanderbartpanel';
import beslutterFunksjonBilde from './beslutterfunksjon.svg';
import hjelpesporsmalBilde from './hjelpesporsmal.svg';
import klagebehandlingBilde from './klagebehandling.svg';
import mellomlagreBilde from './mellomlagre.svg';
import synlighetTilBrukerBilde from './synlighet-til-bruker.svg';
import { Heading } from '@navikt/ds-react';

export function LosningInfo() {
	return (
		<section className="losning-info">
			<Heading size="large" level="2" align="center" spacing>
				5 kjappe om den nye løsningen
			</Heading>
			<div className="losning-info__paneler">
				<TilbakemeldingEkspanderbartpanel
					tittel="Vil det være en beslutterfunksjon?"
					tilbakemeldingTag="beslutterfunksjon"
					bilde={beslutterFunksjonBilde}
				>
					Beslutterfunksjonen vil fortsatt eksistere. Det er ikke endringer i selve rutinen knyttet til
					beslutterfunksjonen. Beslutterordningen på 11-5 i Arena vil fortsatt bestå. Oppdatert rutine kommer
					på Navet så snart den er klar.
					<br />
					<br />
					Med den nye vedtakstøtten blir forskjellen sammenliknet med gammel løsning at veiledere og
					besluttere ikke skal sende Arena-oppgave seg imellom for å kommunisere.
					<br />
					<br />
					Veilederen skal i stedet opprette en Gosys-oppgave og sende den til beslutteren for de
					innsatsgruppene som krever at beslutter kvalitetssikrer (AEV).
					<br />
					<br />
					Det vil være veilederen som sender ut 14a-vedtaket når saken er godkjent.
				</TilbakemeldingEkspanderbartpanel>
				<TilbakemeldingEkspanderbartpanel
					tittel="Kan vi mellomlagre?"
					tilbakemeldingTag="mellomlagring"
					bilde={mellomlagreBilde}
				>
					Teksten lagres automatisk mens du skriver vedtaket, slik at du ikke mister noe dersom det oppstår en
					teknisk feil. Det blir også mulig å mellomlagre, slik at du kan gå inn og ut av vedtaket du jobber
					med.
				</TilbakemeldingEkspanderbartpanel>
				<TilbakemeldingEkspanderbartpanel
					tittel="Vil løsningen være synlig og lik for bruker?"
					tilbakemeldingTag="synlig_for_bruker"
					bilde={synlighetTilBrukerBilde}
				>
					Løsningen vil bare være synlig for veilederen, ikke for brukeren. I Modia fatter veilederen
					14a-vedtaket og skriver AEV. Det sendes automatisk et brev til brukeren når vedtaket er fattet.
				</TilbakemeldingEkspanderbartpanel>
				<TilbakemeldingEkspanderbartpanel
					tittel="Hva skjer med 11-5 vedtak og klagesaksbehandling i Arena?"
					tilbakemeldingTag="11-5_og_klagesaksbehandling"
					bilde={klagebehandlingBilde}
				>
					Vi skal ikke lenger bruke Arena til å fatte 14a-vedtaket og skrive AEV. Øvrige
					saksbehandlingsprosesser i Arena består inntil videre.
				</TilbakemeldingEkspanderbartpanel>
				<TilbakemeldingEkspanderbartpanel
					tittel="Vil det være hjelpespørsmål til arbeidsevnevurderingen, slik at veilederen vet hva vurderingen skal inneholde? "
					tilbakemeldingTag="hjelpesporsmal"
					bilde={hjelpesporsmalBilde}
				>
					Løsningen vil ha veiledende hjelpespørsmål som ligger ved siden av boksen for begrunnelsesfeltet.
				</TilbakemeldingEkspanderbartpanel>
			</div>
		</section>
	);
}
