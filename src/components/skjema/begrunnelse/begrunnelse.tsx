import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import Hjelpesporsmal from './hjelpesporsmal/hjelpesporsmal';
import './begrunnelse.less';
import { useContext } from 'react';
import { SkjemaContext } from '../../providers/skjema-provider';
import { AlertStripeInfo }  from 'nav-frontend-alertstriper';

export const BEGRUNNELSE_MAX_LENGTH = 2000;

interface BegrunnelseProps  {
    begrunnelsefeil?: string;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelse, setBegrunnelse, innsatsgruppe, hovedmal } = useContext(SkjemaContext);
    return (
        <SkjemaElement
            tittel="Begrunnelse"
            feil={props.begrunnelsefeil}
            value={begrunnelse}
        >
            <div className="begrunnelse">
                <AlertStripeInfo>Ved standard innsats(gode muligheter)er det ikke obligatorisk begrunnelse</AlertStripeInfo>
                <div className="begrunnelse-boks">
                <Textarea
                    value={begrunnelse}
                    label=""
                    placeholder="Skriv inn begrunnelsen for vedtaket"
                    maxLength={BEGRUNNELSE_MAX_LENGTH}
                    onChange={(e: any) => {
                        let nyBegrunnelse = e.target.value;
                        if (nyBegrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
                            nyBegrunnelse = nyBegrunnelse.substr(0, BEGRUNNELSE_MAX_LENGTH);
                        }
                        setBegrunnelse(nyBegrunnelse);
                    }}
                />
                    <Hjelpesporsmal innsatsgruppe={innsatsgruppe} hovedmal={hovedmal}/>
                </div>
            </div>
        </SkjemaElement>
);

}

export default Begrunnelse;
