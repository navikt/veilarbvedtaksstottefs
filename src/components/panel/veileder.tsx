import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

interface VeilederProps {
    enhetId: string;
    enhetNavn: string;
    ident: string;
    text: string;
}

export function Veileder({enhetId, enhetNavn, ident, text}: VeilederProps) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">{text}: </Undertekst>
            <Undertekst>{ident}, {enhetId} {enhetNavn}</Undertekst>
        </div>
    );
}
