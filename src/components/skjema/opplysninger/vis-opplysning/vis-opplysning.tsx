import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Opplysning } from '../opplysninger';
import { erDefaultOpplysning } from '../../skjema-utils';
import redigerOpplysningIkon from './rediger.svg';
import redigerOpplysningFyltIkon from './rediger-fylt.svg';
import './vis-opplysning.less';

interface VisopplysningProps {
    opplysning: Opplysning;
    handleOpplysning: () => void;
    onChange: (opplysning: Opplysning) => void;
    erSistEndretIndeks: boolean;
}

export function VisOpplysning(props: VisopplysningProps) {
    const checked = Object.values(props.opplysning)[0];
    const tekst = Object.keys(props.opplysning)[0];
    const kanRedigeres = !erDefaultOpplysning(tekst);

    return (
        <div className="vis-opplysning">
            <Checkbox
                checked={checked}
                label={tekst}
                value={tekst}
                onChange={(e: any) => props.onChange(props.opplysning[tekst] = e.target.checked)}
            />
            {kanRedigeres && <button className="vis-opplysning__rediger-knapp" onClick={props.handleOpplysning}>
                <img src={redigerOpplysningIkon} className="vis-opplysning__rediger-ikon" alt="Rediger opplysning"/>
                <img src={redigerOpplysningFyltIkon} className="vis-opplysning__rediger-ikon--fylt" alt="Rediger opplysning"/>
            </button> }
        </div>
    );
}
