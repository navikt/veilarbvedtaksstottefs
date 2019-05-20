import * as React from 'react';
import './opplysninger.less';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { AndreOpplysninger } from './andre-opplysninger';
import { ValgtOpplysninger } from '../../../pages/skjema/skjema';
import { byggOpplysningliste } from '../skjema-utils';

export enum OpplysningType {
    CV = 'CV',
    JOBBPROFIL = 'JOBBPROFIL',
    REGISTRERINGSINFO = 'REGISTRERINGSINFO',
    EGENVURDERING = 'EGENVURDERING',
}

const OPPLYSNINGER = [
    {
        label: 'Brukerens CV',
        name: OpplysningType.CV,
    },
    {
        label: 'Brukerens svar ved registrering hos NAV',
        name: OpplysningType.REGISTRERINGSINFO,
    },
    {
        label: 'Brukerens jobbprofil på nav.no',
        name: OpplysningType.JOBBPROFIL,
    },
    {
        label: 'Brukerens egenvurdering',
        name: OpplysningType.EGENVURDERING,
    },
];

interface OpplysningerProps {
    handleOpplysningerChanged: (e: any) => void;
    handleAndraOpplysningerChanged: (e: any) => void;
    andreOpplysninger: string[];
    opplysningerfeil?: string;
    opplysninger: ValgtOpplysninger;
}

function Opplysninger(props: OpplysningerProps) {
    const valgeOpplysninger = byggOpplysningliste(props.opplysninger).map(opplysning =>  {
        const obj  = OPPLYSNINGER.find(elem => elem.name  === opplysning);
        return obj && obj.label;
    });

    const samladeOpplysninger = props.andreOpplysninger.concat(valgeOpplysninger as string[]);
    const harOpplysninger = samladeOpplysninger.length > 0;

    return (
        <SkjemaElement
            tittel="Opplysninger"
            value={harOpplysninger ? <LagOpplysningsListe samladeOpplysninger={samladeOpplysninger}/> : null}
            feil={props.opplysningerfeil}
        >
            <ForhandsdefinieradeOppplysninger
                handleOpplysningerChanged={props.handleOpplysningerChanged}
                opplysninger={props.opplysninger}
            />
            <AndreOpplysninger
                andreopplysninger={props.andreOpplysninger}
                setAndreOpplysninger={props.handleAndraOpplysningerChanged}
            />
        </SkjemaElement>
    );
}

export default Opplysninger;

const ForhandsdefinieradeOppplysninger = (props: {handleOpplysningerChanged: (e: any) => void, opplysninger: ValgtOpplysninger}) => {
    return (
        <div className="opplysninger">
            {OPPLYSNINGER.map((opplysning, index) =>
                <CheckboksPanel
                    checked={props.opplysninger[opplysning.name]}
                    key={index}
                    inputProps={{name: opplysning.name}}
                    label={opplysning.label}
                    onChange={(e: any) => props.handleOpplysningerChanged(e)}
                />
            )}
        </div>
    );
};

function LagOpplysningsListe (props: {samladeOpplysninger: string[]}) {
    return (
        <ul>
            {props.samladeOpplysninger.map((opplysning, idx) => <li key={idx}>{opplysning}</li>)}
        </ul>
    );
}