import React, { useState } from 'react';
import Card from '../../components/card/card';
import { Innholdstittel, Normaltekst, Systemtittel, Undertittel } from 'nav-frontend-typografi';
import prelanseringBilde from './prelansering.png';
import { RadioPanel, Textarea } from 'nav-frontend-skjema';
import { Knapp } from 'nav-frontend-knapper';
import { logEvent } from '../../utils/frontend-logger';
import hjerteBilde from './hjerte.svg';
import './prelansering.less';
import Page from '../page/page';

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

const FRITEKST_MAX_LENGTH = 500;
const HAR_SENDT_INNSPILL_KEY = 'har_sendt_innspill';
const INNSPILL_TAG = 'veilarbvedtaksstottefs.innspill';

export function Prelansering() {
    const [harSendt, setHarSendt] = useState(false);
    const [faneNavn, setFaneNavn] = useState(null);
    const [fritekst, setFritekst] = useState('');
    const harSendtTidligere = localStorage.getItem(HAR_SENDT_INNSPILL_KEY) != null;

    const handleFaneNavnChanged = (e: any) => {
        setFaneNavn(e.target.value);
    };

    const handleFritekstChanged = (e: any) => {
        let tekst = e.target.value;
        if (tekst.length > FRITEKST_MAX_LENGTH) {
            tekst = tekst.substr(0, FRITEKST_MAX_LENGTH);
        }
        setFritekst(tekst);
    };

    const handleSendInnspillClicked = () => {
        if (faneNavn || fritekst !== '') {
            logEvent(INNSPILL_TAG, { faneNavn, fritekst});
        }

        setHarSendt(true);
        localStorage.setItem(HAR_SENDT_INNSPILL_KEY, 'true');
    };

    return (
        <Page>
           <PrelanseringInfo/>
            {harSendt ? <TakkMelding/> : null}
            {harSendtTidligere || harSendt ? null :
                <Innspill
                    faneNavn={faneNavn}
                    fritekst={fritekst}
                    handleFaneNavnChanged={handleFaneNavnChanged}
                    handleFritekstChanged={handleFritekstChanged}
                    handleSendInnspillClicked={handleSendInnspillClicked}
                />}
        </Page>
    );
}

const PrelanseringInfo = () => (
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
);

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
                    (<Undertittel>
                        Hva lurer du på om den nye løsningen?
                    </Undertittel>),
                    (<Normaltekst>
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

const TakkMelding = () => (
    <Card className="takk-melding">
        <img src={hjerteBilde} alt="Hjerte" className="takk-melding__ikon"/>
        <div className="takk-melding__tekst">
            <Systemtittel className="takk-melding__tittel">
                Takk for din tilbakemelding!
            </Systemtittel>
            <Normaltekst>
                Dine innspill hjelper oss å forbedre løsningen og vi vil kontinuerlig jobbe videre med forbedringer.
            </Normaltekst>
        </div>
    </Card>
);
