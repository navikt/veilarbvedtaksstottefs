import React from 'react';
import { getInnsatsgruppeNavn, InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';

export function InnsatsgruppeVisning(props: {innsatsgruppe: InnsatsgruppeType}) {
    return (
        <div>
            <label>Innsatsgruppe: </label>
            <span>{getInnsatsgruppeNavn(props.innsatsgruppe)}</span>
        </div>
    );
}