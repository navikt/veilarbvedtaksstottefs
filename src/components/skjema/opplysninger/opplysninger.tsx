import * as React from 'react';
import './opplysninger.less';
import {Checkbox, SkjemaGruppe} from 'nav-frontend-skjema';
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
                    <Checkbox
                        key={index}
                        name={opplysning.name}
                        label={opplysning.label}
                        onChange={handleOpplysningerChanged}
                        className="inputPanel checkboksPanel"
                    />
                )}
            </div>
        );
    };

    return (
       <SkjemaGruppe feil={props.opplysningerfeil ? {feilmelding: props.opplysningerfeil} : undefined}>
        <SkjemaElement tittel="Opplysninger">
            <ForhandsdefinieradeOppplysninger/>
            <AndreOpplysninger
                andreopplysninger={props.andreOpplysninger}
                setAndreOpplysninger={props.handleAndraOpplysningerChanged}
            />
        </SkjemaElement>
       </SkjemaGruppe>
    );
}

export default Opplysninger;
