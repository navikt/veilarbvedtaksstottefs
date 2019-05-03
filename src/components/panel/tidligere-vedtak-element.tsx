import React from 'react';
import { getInnsatsgruppeNavn, InnsatsgruppeType } from '../skjema/innsatsgruppe/innsatsgruppe';
import { Element, Undertekst } from 'nav-frontend-typografi';

export function TidligereVedtakElement (props: {sistOppdatert: string, innsatsgruppe: InnsatsgruppeType}) {
    const innsatsgruppe = getInnsatsgruppeNavn(props.innsatsgruppe);
    return (
        <div className="tidligerevedtakElement">
            <button className="tidligerevedtakElement__knapp">
                <Element>{`Oppfølgingvedtak: ${innsatsgruppe}`}</Element>
                <div style={{display: 'flex'}}>
                    <Undertekst className="label">Sendt:</Undertekst>
                    <Undertekst>{props.sistOppdatert}</Undertekst>
                </div>
            </button>
        </div>
    );
}