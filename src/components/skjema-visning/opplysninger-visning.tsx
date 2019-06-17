import React from 'react';
import { EMDASH } from '../skjema/skjemaelement/skjemaelement';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';

export function OpplysningerVisning(props: { opplysninger: string[] }) {
    return (
        <SkjemaBolk
            tittel="Kilder"
            tittelId="kilder-tittel"
        >
            {props.opplysninger && props.opplysninger.length > 0
                ? <ul>
                    {props.opplysninger.map((opplysning, idx) => <li key={idx}>{opplysning}</li>)}
                </ul>
                : <span>{EMDASH}</span>}
        </SkjemaBolk>
    );
}
