import React, { useState } from 'react';
import { keyCodes } from 'nav-frontend-js-utils';
import { Input } from 'nav-frontend-skjema';

interface OpplysningProps {
    tekst: string;
    onTekstSubmit: (tekst: string) => void;
}

export function RedigerOpplysning(props: OpplysningProps) {
    const[tekst, setTekst] = useState(props.tekst);

    return (
       <div className="andreopplysninger__rediger">
        <Input
            type="text"
            className="inputfeldt"
            label=""
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
       </div>
    );
}