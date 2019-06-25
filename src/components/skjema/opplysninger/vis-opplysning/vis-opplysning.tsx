import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Opplysning } from '../opplysninger';
import { erDefaultOpplysning } from '../../skjema-utils';
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
                <div className="vis-opplysning__rediger-ikon"/>
            </button> }
        </div>
    );
}
