import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import './hovedmal.less';
import { Radio } from 'nav-frontend-skjema';

const Hovedmal: React.FunctionComponent = () => {
    return (
        <div className="hovedmal">
            <Undertittel className="hovedmal__tittel">
                Hovedmål
            </Undertittel>
            <Radio label="Skaffe arbeid" name="hovedmal" />
            <Radio label="Beholde arbeid" name="hovedmal" />
        </div>
    );
};

export default Hovedmal;
