import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import './begrunnelse.less';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { SkjemaElement } from '../skjemaelement/skjemaelement';

interface BegrunnelseProps  {
    begrunnelseTekst: string;
    handleBegrunnelseChanged: (e: any) => void;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelseTekst, handleBegrunnelseChanged } = props;
    return (

        <SkjemaElement tittel="Begrunnelse" className="begrunnelse">
                <Textarea
                    value={begrunnelseTekst}
                    label="Skriv inn begrunnelsen for vedtaket*"
                    maxLength={1000}
                    onChange={(e: any) => handleBegrunnelseChanged(e.target.value)}
                />
            <div>
                <Element>Hjelpespørsmål</Element>
                <Normaltekst>Placeholder for hjelpespørsmål</Normaltekst>
            </div>
        </SkjemaElement>
    );

}

export default Begrunnelse;
