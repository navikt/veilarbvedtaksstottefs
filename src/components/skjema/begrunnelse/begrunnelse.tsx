import * as React from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { useContext, useState } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import './begrunnelse.less';
import { BegrunnelseHjelpeTekster } from './begrunnelse-hjelpetekster';
import { useEffect } from 'react';
import { validerBegrunnelsebegrunnelseMaxLengthTekst } from '../skjema-utils';
import { Normaltekst } from 'nav-frontend-typografi';

export const BEGRUNNELSE_MAX_LENGTH = 4000;

interface BegrunnelseProps {
    begrunnelsefeil?: string;
}

function Begrunnelse(props: BegrunnelseProps) {
    const {begrunnelse, setBegrunnelse} = useContext(SkjemaContext);
    const [begrunnelseFeil, setBegrunnelseFeil] = useState(props.begrunnelsefeil);

    useEffect(() => {
        const errors = validerBegrunnelsebegrunnelseMaxLengthTekst(begrunnelse);
        setBegrunnelseFeil(errors.begrunnelse);
    }, [begrunnelse]);

    useEffect(() => {
        setBegrunnelseFeil(props.begrunnelsefeil);
    }, [props.begrunnelsefeil]);

    return (
        <SkjemaElement
            tittel="Begrunnelse"
            tittelId="begrunnelse-tittel"
            value={begrunnelse}
        >
            <div className="begrunnelse">
                <AlertStripeInfo>
                    Ved <i>standard innsats</i> er begrunnelse ikke obligatorisk.
                    Unntaket er hvis du skal gjøre en ny vurdering, og gjeldende oppfølgingsvedtak viser <i>nedsatt arbeidsevne</i>
              </AlertStripeInfo>
                <SkjemaGruppe
                    feil={begrunnelseFeil ? {feilmelding : begrunnelseFeil} : undefined}
                    className="begrunnelse__container"
                >
                <Textarea
                    value={begrunnelse}
                    label=""
                    placeholder="Skriv inn begrunnelse eller arbeidsevnevurdering"
                    maxLength={BEGRUNNELSE_MAX_LENGTH}
                    onChange={(e: any) => setBegrunnelse(e.target.value)}
                    aria-labelledby="begrunnelse-tittel"
                    aria-describedby="begrunnelse-tips"
                />
                <span id="begrunnelse-tips" style={{display: 'none'}}>
                    Begrunnelse for vedtak/arbeidsevnevurdering, tips ved siden av
                </span>
                </SkjemaGruppe>
                <BegrunnelseHjelpeTekster/>
            </div>
        </SkjemaElement>
    );
}

export default Begrunnelse;
