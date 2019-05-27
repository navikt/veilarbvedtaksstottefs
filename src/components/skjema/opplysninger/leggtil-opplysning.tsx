import * as React from 'react';
import { ReactComponent as LeggTilIkon } from './legg-til.svg';

export function LeggTilOpplysning (props: {leggTilOpplysning: () => void}) {
    return (
        <div
            tabIndex={0}
            role="button"
            aria-labelledby="leggtilkilde"
            onClick={props.leggTilOpplysning}
            className="inputPanel leggtil"
            aria-describedby="leggtilkildedesc"
        >
            <LeggTilIkon className="leggtil__ikon"/>
            <span className="inputPanel__label">Legg til</span>
        </div>
    );
}