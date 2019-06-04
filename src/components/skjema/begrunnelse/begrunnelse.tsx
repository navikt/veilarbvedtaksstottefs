import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Hjelpetekster } from '../hjelpetekster/hjelpetekster';
import { Normaltekst } from 'nav-frontend-typografi';
import './begrunnelse.less';

export const BEGRUNNELSE_MAX_LENGTH = 4000;

interface BegrunnelseProps {
    begrunnelsefeil?: string;
}

function Begrunnelse(props: BegrunnelseProps) {
    const {begrunnelse, setBegrunnelse} = useContext(SkjemaContext);
    const erBegrunnelseForLang = begrunnelse && begrunnelse.length > BEGRUNNELSE_MAX_LENGTH;
    const feil = {
        feilmelding: `Du kan maksimalt skrive ${BEGRUNNELSE_MAX_LENGTH} tegn`
    };
    return (
        <SkjemaElement
            tittel="Begrunnelse"
            feil={props.begrunnelsefeil}
            value={begrunnelse}
        >
            <div className="begrunnelse">
                <AlertStripeInfo>
                    Ved standard innsats(gode muligheter) er det ikke obligatorisk begrunnelse
                </AlertStripeInfo>
                <Textarea
                    value={begrunnelse}
                    label=""
                    placeholder="Skriv inn begrunnelsen for vedtaket"
                    maxLength={BEGRUNNELSE_MAX_LENGTH}
                    onChange={(e: any) => setBegrunnelse(e.target.value)}
                    feil={erBegrunnelseForLang ? feil : undefined}
                />
                <Hjelpetekster>
                    <Normaltekst>
                        Spørsmål som kan være til nytte når du skal gjøre vurderingen din:
                    </Normaltekst>
                    <ul>
                        <li>Hva tenker denne personen selv om mulighetene sine til å være eller komme i jobb?</li>
                        <li>Hvilke typer arbeid ønsker denne personen seg og hva er realistisk ut fra dagens
                            arbeidsmarked?
                        </li>
                        <li>Hva slags veiledning trenger denne personen?</li>
                        <li>Er arbeidsevnen nedsatt, og hvorfor?</li>
                        <li>
                            Trenger denne personen:
                            <ul>
                                <li>yrkes- og/eller karriereveiledning?</li>
                                <li>arbeidsrettede aktiviteter og tiltak?</li>
                                <li>behandling eller oppfølging fra helsevesenet?</li>
                            </ul>
                        </li>
                        <li>Hva har dere blitt enige om?</li>
                    </ul>
                </Hjelpetekster>
            </div>
        </SkjemaElement>
    );
}

export default Begrunnelse;
