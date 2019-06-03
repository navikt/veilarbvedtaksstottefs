import React from 'react';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { Opplysning } from './opplysninger';
import { ReactComponent as RedigerOpplysningIkon } from './rediger.svg';
import classNames from 'classnames';
import { erDefaultOpplysning } from '../skjema-utils';

interface VisopplysningProps {
    opplysning: Opplysning;
    handleOpplysning: () => void;
    onChange: (opplysning: Opplysning) => void;
    erSistEndretIndeks: boolean;
}

export function VisOpplysning(props: VisopplysningProps) {
    const checked =  Object.values(props.opplysning)[0];
    const tekst =  Object.keys(props.opplysning)[0];
    const kanRedigeres = !erDefaultOpplysning(tekst);
    const visopplysningClass = classNames('visopplysning', {'sist-endret': props.erSistEndretIndeks, 'kanRedigeres': kanRedigeres});

    return (
        <div className={visopplysningClass}>
            <CheckboksPanel
                checked={checked}
                label={tekst}
                value={tekst}
                onChange={(e: any) => props.onChange(props.opplysning[tekst] = e.target.checked)}
            />
            {kanRedigeres && <button className="redigeropplysning-knapp" onClick={props.handleOpplysning}>
                <RedigerOpplysningIkon aria-labelledby="redigerIkonId"/>
            </button> }
        </div>
    );
}