import Card from '../../components/card/card';
import { Innholdstittel, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { RadioPanel, Textarea } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';

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

const Innspill = ({ faneNavn, fritekst, handleFaneNavnChanged, handleFritekstChanged, handleSendInnspillClicked}:
                      {faneNavn: FaneNavn | null, fritekst: string, handleFaneNavnChanged: (e: any) => void,
                          handleFritekstChanged: (e: any) => void, handleSendInnspillClicked: () => void  }) => (
    <Card className="innspill">
        <Innholdstittel className="innspill__tittel">
            Kom med dine innspill
        </Innholdstittel>
        <section className="innspill__navn">
            <label form="fanenavn-form">
                <Undertittel>
                    Hva skal fanen hete?
                </Undertittel>
                <Normaltekst className="innspill__navn--ingress">
                    Vi bruker innspillet til å navngi fanen. Svaret er anonymt.
                </Normaltekst>
            </label>
            <form id="fanenavn-form" className="innspill__navn--valg">
                {faneNavnListe.map((mal, idx) =>
                    <RadioPanel
                        key={idx}
                        label={mal.label}
                        name="fanenavn"
                        value={mal.value}
                        onChange={handleFaneNavnChanged}
                        checked={mal.value === faneNavn}
                    />
                )}
            </form>
        </section>
        <section className="innspill__besvarelse">
            <Textarea
                value={fritekst}
                label={[
                    (<Undertittel key="undertittel">
                        Hva lurer du på om den nye løsningen?
                    </Undertittel>),
                    (<Normaltekst key="brodtekst">
                        Vi bruker innspillet ditt til å forberede innføringen av løsningen. Svaret er anonymt.
                    </Normaltekst>)]}
                onChange={handleFritekstChanged}
                maxLength={500}
                className="innspill__fritekst skjemaelement__input textarea--medMeta"
            />
            <Knapp onClick={handleSendInnspillClicked}>
                Send
            </Knapp>
        </section>
    </Card>
);

export default Innspill;
