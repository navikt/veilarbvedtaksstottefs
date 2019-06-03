import React, { useState } from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Opplysning } from './opplysninger';

interface OpplysningProps {
    opplysning: Opplysning;
    onTekstSubmit: (opplysning: Opplysning) => void;
    onTekstCancel: () => void;
}

const OPPLYSNING_MAX_LENGTH = 150;

export function RedigerOpplysning(props: OpplysningProps) {
    const[tekst, setTekst] = useState(Object.keys(props.opplysning)[0]);

    function onSubmit() {
        let obj = {} as Opplysning;
        obj[tekst] = true;
        props.onTekstSubmit(obj);
    }

    return (
        <div className="rediger">
            <Textarea
                label="Skriv inn andre kilder, f.eks. samtalereferat, dialogmeldinger eller helseopplysninger."
                value={tekst}
                maxLength={OPPLYSNING_MAX_LENGTH}
                onChange={(e: any) => {
                    let nyOpplysning = e.target.value;
                    if ( nyOpplysning.length > OPPLYSNING_MAX_LENGTH) {
                        nyOpplysning = nyOpplysning.substr(0, OPPLYSNING_MAX_LENGTH);
                    }
                    setTekst(nyOpplysning);
                }}
                autoFocus={true}
            />
            <div className="rediger__aksjoner">
                <Flatknapp onClick={onSubmit}> Ferdig</Flatknapp>
                <Flatknapp onClick={props.onTekstCancel}>Avbryt</Flatknapp>
            </div>
        </div>
    );
}