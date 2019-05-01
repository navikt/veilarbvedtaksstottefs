import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';
import { Veileder } from '../../utils/types/vedtak';

export function EndretAv(props: {endretAv: Veileder}) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">Endret av: </Undertekst>
            <Undertekst>{props.endretAv.ident}</Undertekst>
            <Undertekst>{props.endretAv.enhetId}, {props.endretAv.enhetNavn}</Undertekst>
        </div>
    );
}