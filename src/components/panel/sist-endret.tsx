import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

export function SistEndret(props: {sistOppdatert: string}) {
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">Sist endret: </Undertekst>
            <Undertekst>{props.sistOppdatert}</Undertekst>
        </div>
    );
}