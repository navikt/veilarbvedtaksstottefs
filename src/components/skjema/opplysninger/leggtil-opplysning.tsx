import * as React from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';

export function LeggTilOpplysning (props: {leggTilOpplysning: () => void}) {
    return (
        <div tabIndex={0} role="button" aria-labelledby="legg til opplysning" onClick={props.leggTilOpplysning} className="inputPanel leggtil">
            <LeggTilIkon className="leggtil__ikon"/>
            <span className="inputPanel__label">Legg til</span>
        </div>
    );
}