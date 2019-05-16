import * as React from 'react';
import './opplysninger.less';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { EMDASH, SkjemaElement } from '../skjemaelement/skjemaelement';
import { AndreOpplysninger } from './andre-opplysninger';
import { ValgtOpplysninger } from '../../../pages/skjema/skjema';
import { byggOpplysningliste } from '../skjema-utils';

export enum OpplysningType {
    CV = 'CV',
    JOBBPROFIL = 'JOBBPROFIL',
    REGISTRERINGSINFO = 'REGISTRERINGSINFO',
    EGENVURDERING = 'EGENVURDERING',
}

interface OpplysningerProps {
    handleOpplysningerChanged: (e: any) => void;
    handleAndraOpplysningerChanged: (e: any) => void;
    andreOpplysninger: string[];
    opplysningerfeil?: string;
    opplysninger: ValgtOpplysninger;
}

function Opplysninger(props: OpplysningerProps) {
    const {handleOpplysningerChanged} = props;

    const opplysninger = [
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

    const ForhandsdefinieradeOppplysninger = () => {
        return (
            <div className="opplysninger">
                {opplysninger.map((opplysning, index) =>
                    <CheckboksPanel
                        checked={props.opplysninger[opplysning.name]}
                        key={index}
                        inputProps={{value: opplysning.name}}
                        label={opplysning.label}
                        onChange={(e: any) => handleOpplysningerChanged(e)}
                    />
                )}
            </div>
        );
    };

    const samladeOpplysninger = (byggOpplysningliste(props.opplysninger)as string[]).concat(props.andreOpplysninger);
    const harOpplysninger = samladeOpplysninger.length > 0;
    return (
        <SkjemaElement
            tittel="Opplysninger"
            value={harOpplysninger ? <LagOpplysningsListe samladeOpplysninger={samladeOpplysninger}/> : null}
            feil={props.opplysningerfeil}
        >
            <ForhandsdefinieradeOppplysninger/>
            <AndreOpplysninger
                andreopplysninger={props.andreOpplysninger}
                setAndreOpplysninger={props.handleAndraOpplysningerChanged}
            />
        </SkjemaElement>
    );
}

export default Opplysninger;

function LagOpplysningsListe (props: {samladeOpplysninger: string[]}) {
    return (
        <ul>
            {props.samladeOpplysninger.map((opplysning, idx) => <li key={idx}>{opplysning}</li>)}
        </ul>
    );
}
