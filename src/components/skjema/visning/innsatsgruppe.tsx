import React from 'react';
import { InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';

export function InnsatsgruppeVisning(props: {innsatsgruppe: InnsatsgruppeType}) {
    return (
        <div>
            <label>Hovedmal</label>
            <span>{props.innsatsgruppe}</span>
        </div>
    );
}