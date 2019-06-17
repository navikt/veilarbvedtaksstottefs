import React from 'react';
import Card from '../../components/card/card';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import hjerteBilde from './hjerte.svg';

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

export default TakkMelding;
