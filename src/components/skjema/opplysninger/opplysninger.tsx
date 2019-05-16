import * as React from 'react';
import './opplysninger.less';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { AndreOpplysninger } from './andre-opplysninger';

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
                        checked={false}
                        key={index}
                        label={opplysning.label}
                        onChange={handleOpplysningerChanged}
                    />
                )}
            </div>
        );
    };

    return (
        <SkjemaElement
            tittel="Opplysninger"
            value={props.andreOpplysninger[0]}
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
