import React from 'react';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';
import { EMDASH } from '../../utils';

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
