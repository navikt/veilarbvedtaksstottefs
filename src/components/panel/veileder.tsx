import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

interface VeilederProps {
    enhetId: string;
    ident: string;
    text: string;
    className?: string;
}

export function Veileder(props: VeilederProps) {
    const { text, ident, enhetId, className } = props;
    return (
        <div className={className} style={{display: 'flex'}}>
            <Undertekst className="label">{text}: </Undertekst>
            <Undertekst>{ident}, {enhetId}</Undertekst>
        </div>
    );
}
