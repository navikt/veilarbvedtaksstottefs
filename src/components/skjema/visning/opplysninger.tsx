import React from 'react';
import { EMDASH } from '../skjemaelement/skjemaelement';

export function Opplysninger (props: {opplysninger: string[]}) {
    return (
        <section>
            <label>Opplysninger</label>
            {props.opplysninger && props.opplysninger.length > 0
                ? <ul>
                    {props.opplysninger.map((opplysning, idx) => <li key={idx}>{opplysning}</li>)}
                </ul>
                : <span>{EMDASH}</span>}

        </section>
    );
}