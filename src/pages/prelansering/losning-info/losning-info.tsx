import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import TilbakemeldingEkspanderbartpanel from '../tilbakemelding-ekspanderbartpanel/tilbakemelding-ekspanderbartpanel';
import beslutterFunksjonBilde from './beslutterfunksjon.svg';
import hjelpesporsmalBilde from './hjelpesporsmal.svg';
import klagebehandlingBilde from './klagebehandling.svg';
import mellomlagreBilde from './mellomlagre.svg';
import synlighetTilBrukerBilde from './synlighet-til-bruker.svg';

// tslint:disable max-line-length

export function LosningInfo() {
    return (
        <section className="losning-info">
            <Innholdstittel className="losning-info__tittel">
                5 kjappe om den nye løsningen
            </Innholdstittel>
            <div className="losning-info__paneler">
                <TilbakemeldingEkspanderbartpanel
                    tittel="Vil det være en beslutterfunksjon?"
                    tilbakemeldingTag="beslutterfunksjon"
                    bilde={beslutterFunksjonBilde}
                >
                    Beslutterfunksjonen vil fortsatt eksistere. Forskjellen blir at veiledere og besluttere skal slutte å sende Arena-oppgave seg mellom for å kommunisere. I stedet for skal veilederen opprette en oppgave i Gosys og sende den til beslutteren. Det vil være veileder som sender ut 14a-vedtaket når saken er godkjent. Beslutterordningen på 11-5 i Arena vil fortsatt bestå. Oppdatert rutine kommer.
                </TilbakemeldingEkspanderbartpanel>
                <TilbakemeldingEkspanderbartpanel
                    tittel="Kan vi mellomlagre?"
                    tilbakemeldingTag="mellomlagring"
                    bilde={mellomlagreBilde}
                >
                    Teksten lagres automatisk mens du skriver vedtaket, slik at du ikke mister noe om systemet skulle feile. Du vil også kunne mellomlagre, for å gå inn og ut av vedtaket du jobber med.
                </TilbakemeldingEkspanderbartpanel>
                <TilbakemeldingEkspanderbartpanel
                    tittel="Vil løsningen være synlig og lik for bruker?"
                    tilbakemeldingTag="synlig_for_bruker"
                    bilde={synlighetTilBrukerBilde}
                >
                    Behovs- og arbeidsevnevurderingen kommer til å se ulik ut for veilederen og brukeren. I Modia fatter veilederen 14a-vedtak og skriver AEV, som deretter blir sendt elektronisk til brukeren når vedtaket er fattet.
                </TilbakemeldingEkspanderbartpanel>
                <TilbakemeldingEkspanderbartpanel
                    tittel="Hva skjer med 11-5 vedtak og klagesaksbehandling i Arena?"
                    tilbakemeldingTag="11-5_og_klagesaksbehandling"
                    bilde={klagebehandlingBilde}
                >
                    Vi skal ikke lenger bruke Arena til å fatte 14a og skrive AEV, men øvrige saksbehandlingsprosesser i Arena vil bestå inntil videre.
                </TilbakemeldingEkspanderbartpanel>
                <TilbakemeldingEkspanderbartpanel
                    tittel="Vil det være hjelpespørsmål til arbeidsevnevurderingen?"
                    tilbakemeldingTag="hjelpesporsmal"
                    bilde={hjelpesporsmalBilde}
                >
                    Løsningen vil ha hjelpespørsmål som ligger ved siden av boksen for begrunnelsesfelt.
                </TilbakemeldingEkspanderbartpanel>
            </div>
        </section>
    );
}
