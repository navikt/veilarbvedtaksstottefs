import React from 'react';
import Card from '../../components/card/card';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import prelanseringBilde from './prelansering.png';
import './prelansering.less';

export function Prelansering() {
    return (
        <Card className="prelansering">
            <div>
                <Innholdstittel>
                    Her kommer ny løsning for
                </Innholdstittel>
                <Innholdstittel className="prelansering__tittel">
                    behovs- og arbeidsevnevurdering
                </Innholdstittel>
                <Normaltekst className="prelansering__tekst1">
                    Vi slår sammen oppfølgingsvedtaket (§14 a) og arbeidsevnevurderingen i en samlet løsning. Det betyr
                    at for de av brukerne som skal ha en arbeidsevnevurdering, skrives denne i begrunnelsesfeltet i
                    oppfølgingsvedtaket.
                </Normaltekst>
                <Normaltekst className="prelansering__tekst2">
                    Når den nye løsningen kommer skal vi ikke lenger skrive det tidligere
                    arbeidsevnevurderingsdokumentet i Arena, og vi skal heller ikke fatte oppfølgingsvedtaket i Arena.
                </Normaltekst>
            </div>
            <img src={prelanseringBilde} className="prelansering__bilde"/>
        </Card>
    );
}
