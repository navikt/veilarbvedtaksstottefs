import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { CheckboksPanelGruppe } from 'nav-frontend-skjema';
import './opplysninger.less';

export enum OpplysningType {
    BRUKERENS_CV = 'brukerens_cv',
    BRUKERENS_JOBBPROFIL = 'brukerens_jobbprofil',
    BRUKERENS_SVAR_VED_REGISTRERING = 'brukerens_svar_ved_registrering',
    BRUKERENS_EGENVURDERING = 'brukerens_egenvurdering',

}

interface OpplysningerProps {
    handleOpplysningerChanged: (e: any) => void;
}

function Opplysninger(props: OpplysningerProps) {
    const {handleOpplysningerChanged} = props;

    const opplysninger = [
        {
            label: 'Brukerens CV',
            value: OpplysningType.BRUKERENS_CV,
            checked: false
        },
        {
            label: 'Brukerens svar ved registrering hos NAV',
            value: OpplysningType.BRUKERENS_SVAR_VED_REGISTRERING,
            checked: false
        },
        {
            label: 'Brukerens jobbprofil på nav.no',
            value: OpplysningType.BRUKERENS_JOBBPROFIL,
            checked: false
        },
        {
            label: 'Brukerens egenvurdering',
            value: OpplysningType.BRUKERENS_EGENVURDERING,
            checked: false
        },
    ];

    return (
        <div className="opplysninger">
            <Undertittel className="opplysninger__tittel">
                Opplysninger det legges vekt på i vurderingen
            </Undertittel>
            <CheckboksPanelGruppe
                checkboxes={opplysninger}
                legend="Marker hvilke opplysninger du har lalgt vekt på"
                onChange={(e, value) => handleOpplysningerChanged(e)}
            />
        </div>
    );
}

export default Opplysninger;
