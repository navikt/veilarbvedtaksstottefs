import React from 'react';
import { getInnsatsgruppeNavn, InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import SkjemaBolk from '../skjema/bolk/skjema-bolk';
import { OrNothing } from '../../utils/types/ornothing';

export function InnsatsgruppeVisning(props: {innsatsgruppe: OrNothing<InnsatsgruppeType>, beslutter: OrNothing<string>}) {
    return (
        <SkjemaBolk
            tittel="Innsatsgruppe"
            tittelId="innsatsgruppe-tittel"
        >
            <div className="innsatsgruppe-visning">
                <span>{getInnsatsgruppeNavn(props.innsatsgruppe)}</span>
                {props.beslutter && <span><b>Beslutter: </b> {props.beslutter}</span>}
            </div>
        </SkjemaBolk>
    );
}
