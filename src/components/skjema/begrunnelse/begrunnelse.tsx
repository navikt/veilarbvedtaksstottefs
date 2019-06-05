import * as React from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './begrunnelse.less';
import { BegrunnelseHjelpeTekster } from './begrunnelse-hjelpetekster';

export const BEGRUNNELSE_MAX_LENGTH = 2000;

interface BegrunnelseProps {
    begrunnelsefeil?: string;
}

function Begrunnelse(props: BegrunnelseProps) {
    const {begrunnelse, setBegrunnelse} = useContext(SkjemaContext);
    return (
        <SkjemaElement
            tittel="Begrunnelse"
            value={begrunnelse}
        >
            <div className="begrunnelse">
                <AlertStripeInfo>Ved standard innsats(gode muligheter)er det ikke obligatorisk
                    begrunnelse</AlertStripeInfo>
                <SkjemaGruppe feil={props.begrunnelsefeil ? {feilmelding : props.begrunnelsefeil} : undefined} className="begrunnelse__container">
                <Textarea
                    value={begrunnelse}
                    label=""
                    placeholder="Skriv inn begrunnelsen for vedtaket"
                    maxLength={BEGRUNNELSE_MAX_LENGTH}
                    onChange={(e: any) => {
                        let nyBegrunnelse = e.target.value;
                        if (nyBegrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
                            nyBegrunnelse = nyBegrunnelse.substr(0, BEGRUNNELSE_MAX_LENGTH);
                        }
                        setBegrunnelse(nyBegrunnelse);
                    }}
                />
                </SkjemaGruppe>
                <BegrunnelseHjelpeTekster/>
            </div>
        </SkjemaElement>
    );
}

export default Begrunnelse;
