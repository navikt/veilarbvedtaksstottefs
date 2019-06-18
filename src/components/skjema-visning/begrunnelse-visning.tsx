import React from 'react';
import { EMDASH } from '../skjema/skjemaelement/skjemaelement';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';

export function BegrunnelseVisning(props: {begrunnelse: string}) {
    return (
        <SkjemaBolk
            tittel="Begrunnelse"
            tittelId="begrunnelse-tittel"
        >
            <p className="begrunnelse-visning">{props.begrunnelse ? props.begrunnelse : EMDASH}</p>
        </SkjemaBolk>
    );
}
