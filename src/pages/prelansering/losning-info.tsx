import React from 'react';
import { Innholdstittel } from 'nav-frontend-typografi';
import InfoEkspanderbartpanel from './info-ekspanderbartpanel/info-ekspanderbartpanel';

export function LosningInfo() {
    return (
        <section className="losning-info">
            <Innholdstittel className="losning-info__tittel">
                5 kjappe om den nye løsningen
            </Innholdstittel>
            <div className="losning-info__paneler">
                <InfoEkspanderbartpanel tittel="Vil det være en beslutterfunksjon?">
                    Beslutterfunksjonen vil fortsatt eksistere. Forskjellen blir at veiledere og besluttere skal slutte å sende Arena-oppgave seg mellom for å kommunisere. I stedet for skal veilederen opprette en oppgave i Gosys og sende den til beslutteren. Det vil være veileder som sender ut 14a-vedtaket når saken er godkjent. Beslutterordningen på 11-5 i Arena vil fortsatt bestå. Oppdatert rutine kommer.
                </InfoEkspanderbartpanel>
                <InfoEkspanderbartpanel tittel="Kan vi mellomlagre?">
                    Teksten lagres automatisk mens du skriver vedtaket, slik at du ikke mister noe om systemet skulle feile. Du vil også kunne mellomlagre, for å gå inn og ut av vedtaket du jobber med.
                </InfoEkspanderbartpanel>
                <InfoEkspanderbartpanel tittel="Vil løsningen være synlig og lik for bruker?">
                    Behovs- og arbeidsevnevurderingen kommer til å se ulik ut for veilederen og brukeren. I Modia fatter veilederen 14a-vedtak og skriver AEV, som deretter blir sendt elektronisk til brukeren når vedtaket er fattet.
                </InfoEkspanderbartpanel>
                <InfoEkspanderbartpanel tittel="Hva skjer med 11-5 vedtak og klagesaksbehandling i Arena?">
                    Vi skal ikke lenger bruke Arena til å fatte 14a og skrive AEV, men øvrige saksbehandlingsprosesser i Arena vil bestå inntil videre.
                </InfoEkspanderbartpanel>
                <InfoEkspanderbartpanel tittel="Vil det være hjelpespørsmål til arbeidsevnevurderingen?">
                    Løsningen kommer til å gi tilpassede hjelpespørsmål ut ifra valgt innsatsgruppe. Hjelpespørsmålene vil ligge ved siden av boksen for begrunnelsesfelt.
                </InfoEkspanderbartpanel>
            </div>
        </section>
    );
}
