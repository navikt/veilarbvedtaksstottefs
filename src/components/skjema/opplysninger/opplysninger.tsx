import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Checkbox } from 'nav-frontend-skjema';
import './opplysninger.less';

const Opplysninger: React.FunctionComponent = () => {
    return (
        <div className="opplysninger">
            <Undertittel className="opplysninger__tittel">
                Opplysninger det legges vekt på i vurderingen
            </Undertittel>
            <Checkbox label="Brukerens svar ved registrering hos NAV"/>
            <Checkbox label="Brukerens CV"/>
        </div>
    );
};

export default Opplysninger;
