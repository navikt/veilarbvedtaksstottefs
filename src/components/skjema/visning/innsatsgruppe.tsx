import React from 'react';
import { getInnsatsgruppeNavn, InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';

export function InnsatsgruppeVisning(props: {innsatsgruppe: InnsatsgruppeType}) {
    return (
        <section>
            <label>Innsatsgruppe: </label>
            <span>{getInnsatsgruppeNavn(props.innsatsgruppe)}</span>
        </section>
    );
}