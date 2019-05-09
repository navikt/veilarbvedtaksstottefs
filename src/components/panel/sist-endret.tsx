import React from 'react';
import { Undertekst } from 'nav-frontend-typografi';

export function SistEndret(props: {sistOppdatert: string}) {
    const dato = new Date(props.sistOppdatert).toISOString().slice(0, 10);
    return (
        <div style={{display: 'flex'}}>
            <Undertekst className="label">Sist endret: </Undertekst>
            <Undertekst>{dato}</Undertekst>
        </div>
    );
}