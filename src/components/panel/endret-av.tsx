import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

export function EndretAv(props: {veilederEnhetId: string, veilederIdent: string}) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">Endret av: </Undertekst>
            <Undertekst>{props.veilederIdent}</Undertekst>
            <Undertekst>{props.veilederEnhetId}</Undertekst>
        </div>
    );
}