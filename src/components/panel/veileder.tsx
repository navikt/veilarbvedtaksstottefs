import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

export function Veileder({enhetId, ident, text}:
                             {enhetId: string, ident: string, text: string}) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">{text}: </Undertekst>
            <Undertekst>{ident}, {enhetId}</Undertekst>
        </div>
    );
}
