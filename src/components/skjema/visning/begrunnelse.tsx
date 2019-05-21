import React from 'react';
import { EMDASH } from '../skjemaelement/skjemaelement';

export function BegrunnelseVisning(props: {begrunnelse: string}) {
    return (
        <section>
            <label>Begrunnelse: </label>
            <p>{props.begrunnelse ? props.begrunnelse : EMDASH}</p>
        </section>
    );
}