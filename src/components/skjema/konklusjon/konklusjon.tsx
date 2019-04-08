import * as React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { Radio } from 'nav-frontend-skjema';
import './konklusjon.less';

const Konklusjon: React.FunctionComponent = () => {
    return (
        <div className="konklusjon">
            <Undertittel className="konklusjon__tittel">
                Konklusjon og veien videre
            </Undertittel>
            <Radio label="Gode muligheter (standard innsats)" name="konklusjon" />
            <Radio label="Trenger veiledning (situasjonsbestemt innsats)" name="konklusjon" />
            <Radio label="Nedsatt arbeidsevne (spesielt tilpasset innsats)" name="konklusjon" />
            <Radio label="Gradert varig nedsatt arbeidsevne (gradert varig tilpasset innsats)" name="konklusjon" />
            <Radio label="Varig nedsatt arbeidsevne (varig tilpasset innsats)" name="konklusjon" />
        </div>
    );
};

export default Konklusjon;
