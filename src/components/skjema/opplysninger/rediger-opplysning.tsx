import React, { useState } from 'react';
import { keyCodes } from 'nav-frontend-js-utils';

interface OpplysningProps {
    tekst: string;
    onTekstSubmit: (tekst: string) => void;
}

export function RedigerOpplysning(props: OpplysningProps) {
    const[tekst, setTekst] = useState(props.tekst);

    return (
        <input
            type="text"
            className="inputfeldt"
            value={tekst}
            onChange={e => setTekst(e.target.value)}
            onBlur={() => props.onTekstSubmit(tekst)}
            autoFocus={true}
            onKeyDown={e => {
                if (e.keyCode === keyCodes.enter) {
                    props.onTekstSubmit(tekst);
                }}
            }
        />
    );
}