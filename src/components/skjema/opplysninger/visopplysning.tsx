import React from 'react';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { Flatknapp } from 'nav-frontend-knapper';
import { Opplysning } from './opplysninger';
import { ReactComponent as RedigerOpplysningIkon } from './rediger.svg';

interface VisopplysningProps {
    opplysning: Opplysning;
    handleOpplysning: () => void;
    onChange: (opplysning: Opplysning) => void;
}

export function VisOpplysning(props: VisopplysningProps) {
    const checked =  Object.values(props.opplysning)[0];
    const tekst =  Object.keys(props.opplysning)[0];
    return (
        <div className="visopplysning">
            <CheckboksPanel
                checked={checked}
                label={tekst}
                value={tekst}
                onChange={(e: any) => props.onChange(props.opplysning[tekst] = e.target.checked)}
            />
            <button className="redigeropplysning-knapp" onClick={props.handleOpplysning}>
                <RedigerOpplysningIkon aria-labelledby="redigerIkonId"/>
            </button>
        </div>
    );
}