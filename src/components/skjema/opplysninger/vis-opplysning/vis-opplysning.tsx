import React from 'react';
import { Checkbox } from 'nav-frontend-skjema';
import { Opplysning } from '../opplysninger';
import { erDefaultOpplysning } from '../../skjema-utils';
import { useFetchStore } from '../../../../stores/fetch-store';
import './vis-opplysning.less';

interface VisOpplysningProps {
    opplysning: Opplysning;
    handleOpplysning: () => void;
    onChange: (opplysning: Opplysning) => void;
    erSistEndretIndeks: boolean;
}

export function VisOpplysning(props: VisOpplysningProps) {
    const { malform } = useFetchStore();
    const checked = Object.values(props.opplysning)[0];
    const tekst = Object.keys(props.opplysning)[0];
    const malformData = malform.data ? malform.data.malform : null;
    const kanRedigeres = !erDefaultOpplysning(tekst, malformData);

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
