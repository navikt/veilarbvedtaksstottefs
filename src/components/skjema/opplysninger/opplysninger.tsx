import * as React from 'react';
import './opplysninger.less';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
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
