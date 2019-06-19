import * as React from 'react';
import { ReactComponent as LeggTilIkon } from './add.svg';
import { Normaltekst } from 'nav-frontend-typografi';
import './legg-til-opplysning.less';

export function LeggTilOpplysning (props: {leggTilOpplysning: () => void}) {
    return (
        <button
            className="legg-til-kilde"
            onClick={props.leggTilOpplysning}
            aria-labelledby="leggtilkilde"
            aria-describedby="leggtilkildedesc"
        >
            <LeggTilIkon aria-labelledby="leggtilkilde"/>
            <Normaltekst tag="span" className="legg-til-kilde__tekst">Legg til andre kilder</Normaltekst>
        </button>
    );
}
