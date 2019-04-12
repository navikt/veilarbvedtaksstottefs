import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import './opplysninger.less';

export enum OpplysningType {
    BRUKERENS_CV = 'brukerens_cv',
    BRUKERENS_SVAR_VED_REGISTRERING = 'brukerens_svar_ved_registrering'
}

interface OpplysningerProps {
    handleOpplysningerChanged: (e: any) => void;
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
    ];

    return (
        <div className="opplysninger">
            <Undertittel className="opplysninger__tittel">
                Opplysninger det legges vekt på i vurderingen
            </Undertittel>
            {
                opplysninger.map((opplysning, index) =>
                    <Checkbox
                        key={index}
                        name={opplysning.name}
                        label={opplysning.label}
                        onChange={handleOpplysningerChanged}
                    />
                )
            }
        </div>
    );
};

export default Opplysninger;
