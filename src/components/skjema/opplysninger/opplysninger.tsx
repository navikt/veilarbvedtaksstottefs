import * as React from 'react';
import './opplysninger.less';
import { CheckboksPanel } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { AndreOpplysninger } from './andre-opplysninger';

export enum OpplysningType {
    BRUKERENS_CV = 'CV',
    BRUKERENS_JOBBPROFIL = 'JOBBPROFIL',
    BRUKERENS_SVAR_VED_REGISTRERING = 'REGISTRERINGSINFO',
    BRUKERENS_EGENVURDERING = 'EGENVURDERING',

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
            name: OpplysningType.BRUKERENS_CV,
        },
        {
            label: 'Brukerens svar ved registrering hos NAV',
            name: OpplysningType.BRUKERENS_SVAR_VED_REGISTRERING,
        },
        {
            label: 'Brukerens jobbprofil på nav.no',
            name: OpplysningType.BRUKERENS_JOBBPROFIL,
        },
        {
            label: 'Brukerens egenvurdering',
            name: OpplysningType.BRUKERENS_EGENVURDERING,
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
