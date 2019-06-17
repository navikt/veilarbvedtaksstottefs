import React from 'react';
import { getInnsatsgruppeNavn, InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';

export function InnsatsgruppeVisning(props: {innsatsgruppe: InnsatsgruppeType}) {
    return (
        <SkjemaBolk
            tittel="Innsatsgruppe"
            tittelId="innsatsgruppe-tittel"
        >
            <span>{getInnsatsgruppeNavn(props.innsatsgruppe)}</span>
        </SkjemaBolk>
    );
}
