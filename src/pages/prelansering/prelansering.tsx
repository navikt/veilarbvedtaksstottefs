import React from 'react';
import Card from '../../components/card/card';
import { Element, Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import prelanseringBilde from './prelansering.png';
import { RadioPanel, Textarea } from 'nav-frontend-skjema';
import './prelansering.less';
import { Knapp } from 'nav-frontend-knapper';

enum FaneNavn {
    OPPFOLGINGSVEDTAK_14A = 'OPPFOLGINGSVEDTAK_14A',
    BEHOVS_OG_ARBEIDSEVNEVURDERING = 'BEHOVS_OG_ARBEIDSEVNEVURDERING',
    OPPFOLGINGSVEDTAK = 'OPPFOLGINGSVEDTAK',
    VET_IKKE = 'VET_IKKE',
}

const faneNavnListe = [
    {
        label: 'Oppfølgingsvedtak (§ 14a / AEV)',
        value: FaneNavn.OPPFOLGINGSVEDTAK_14A
    },
    {
        label: 'Behovs- og arbeidsevnevurdering',
        value: FaneNavn.BEHOVS_OG_ARBEIDSEVNEVURDERING
    },
    {
        label: 'Oppfølgingsvedtak',
        value: FaneNavn.OPPFOLGINGSVEDTAK
    },
    {
        label: 'Vet ikke',
        value: FaneNavn.VET_IKKE
    },
];

export function Prelansering() {
    return (
        <>
            <Card className="prelansering">
                <div>
                    <Innholdstittel>
                        Her kommer ny løsning for
                    </Innholdstittel>
                    <Innholdstittel className="prelansering__tittel">
                        behovs- og arbeidsevnevurdering
                    </Innholdstittel>
                    <Normaltekst className="prelansering__tekst1">
                        Vi slår sammen oppfølgingsvedtaket (§14 a) og arbeidsevnevurderingen i en samlet løsning. Det
                        betyr at for de av brukerne som skal ha en arbeidsevnevurdering, skrives denne i
                        begrunnelsesfeltet i oppfølgingsvedtaket.
                    </Normaltekst>
                    <Normaltekst className="prelansering__tekst2">
                        Når den nye løsningen kommer skal vi ikke lenger skrive det tidligere
                        arbeidsevnevurderingsdokumentet i Arena, og vi skal heller ikke fatte oppfølgingsvedtaket i Arena.
                    </Normaltekst>
                </div>
                <img src={prelanseringBilde} className="prelansering__bilde"/>
            </Card>

            <Card className="innspill">
                <Innholdstittel className="innspill__tittel">
                    Kom med dine innspill
                </Innholdstittel>
                <section className="innspill__navn">
                    <Element>
                        Hva skal fanen hete?
                    </Element>
                    <Normaltekst>
                        Vi bruker innspillet til å navngi fanen. Svaret er anonymt.
                    </Normaltekst>
                    <div className="innspill__navn-valg">
                        {faneNavnListe.map((mal, idx) =>
                            <RadioPanel
                                key={idx}
                                label={mal.label}
                                name="hovedmal"
                                value={mal.value}
                                onChange={() => {}}
                                checked={false}
                            />
                        )}
                    </div>
                </section>
                <section className="innspill__besvarelse">
                    <Element>
                        Hva lurer du på om den nye løsningen?
                    </Element>
                    <Normaltekst>
                        Vi bruker innspillet ditt til å forberede innføringen av løsningen. Svaret er anonymt.
                    </Normaltekst>
                    <Textarea
                        value=""
                        label={null}
                        onChange={() => {}}
                        className="innspill__fritekst skjemaelement__input textarea--medMeta"
                    />
                    <Knapp>
                        Send
                    </Knapp>
                </section>
            </Card>
        </>
    );
}
