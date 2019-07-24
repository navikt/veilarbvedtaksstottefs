import React, { useContext, useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { BegrunnelseHjelpeTekster } from './begrunnelse-hjelpetekster';
import { validerBegrunnelsebegrunnelseMaxLengthTekst } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import './begrunnelse.less';

export const BEGRUNNELSE_MAX_LENGTH = 4000;

interface BegrunnelseProps {
    begrunnelsefeil?: string;
}

function Begrunnelse(props: BegrunnelseProps) {
    const { begrunnelse, setBegrunnelse } = useSkjemaStore();
    const [begrunnelseFeil, setBegrunnelseFeil] = useState(props.begrunnelsefeil);

    useEffect(() => {
        const errors = validerBegrunnelsebegrunnelseMaxLengthTekst(begrunnelse);
        setBegrunnelseFeil(errors.begrunnelse);
    }, [begrunnelse]);

    useEffect(() => {
        setBegrunnelseFeil(props.begrunnelsefeil);
    }, [props.begrunnelsefeil]);

    return (
        <SkjemaBolk
            tittel="Begrunnelse"
            tittelId="begrunnelse-tittel"
        >
            <div className="begrunnelse">
                <AlertStripeInfo>
                    Ved <i>standard innsats</i> er begrunnelse ikke obligatorisk.
                    Unntaket er hvis du skal gjøre en ny vurdering,
                    og gjeldende oppfølgingsvedtak viser <i>nedsatt arbeidsevne</i>
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
        </SkjemaBolk>
    );
}

export default Begrunnelse;
