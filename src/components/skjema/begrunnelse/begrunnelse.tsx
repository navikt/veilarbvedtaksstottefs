import React, { useEffect, useState } from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { BegrunnelseHjelpeTekster } from './begrunnelse-hjelpetekster';
import { lagSkjemaElementFeil, validerBegrunnelseMaxLength } from '../skjema-utils';
import SkjemaBolk from '../bolk/skjema-bolk';
import { useSkjemaStore } from '../../../stores/skjema-store';
import './begrunnelse.less';

export const BEGRUNNELSE_MAX_LENGTH = 4000;

function Begrunnelse() {
    const { begrunnelse, setBegrunnelse, errors } = useSkjemaStore();
    const [begrunnelseFeil, setBegrunnelseFeil] = useState(errors.begrunnelse);

    useEffect(() => {
        const feil = validerBegrunnelseMaxLength(begrunnelse);
        setBegrunnelseFeil(feil.begrunnelse);
    }, [begrunnelse]);

    useEffect(() => {
        setBegrunnelseFeil(errors.begrunnelse);
    }, [errors.begrunnelse]);

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
                    feil={lagSkjemaElementFeil(begrunnelseFeil)}
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
