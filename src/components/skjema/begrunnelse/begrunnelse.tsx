import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';
import { OrNothing } from '../../../utils/types/ornothing';
import { HovedmalType } from '../hovedmal/hovedmal';
import Hjelpesporsmal from './hjelpesporsmal/hjelpesporsmal';
import './begrunnelse.less';

export const BEGRUNNELSE_MAX_LENGTH = 2000;

interface BegrunnelseProps  {
    begrunnelseTekst: string;
    handleBegrunnelseChanged: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    hovedmal: OrNothing<HovedmalType>;
    begrunnelsefeil?: string;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelseTekst, handleBegrunnelseChanged, innsatsgruppe, hovedmal } = props;
    return (
        <SkjemaElement
            tittel="Begrunnelse"
            feil={props.begrunnelsefeil}
            value={props.begrunnelseTekst}
        >
            <div className="begrunnelse">
                <Textarea
                    value={begrunnelseTekst}
                    label=""
                    placeholder="Skriv inn begrunnelsen for vedtaket"
                    maxLength={BEGRUNNELSE_MAX_LENGTH}
                    onChange={(e: any) => {
                        let nyBegrunnelse = e.target.value;
                        if (nyBegrunnelse.length > BEGRUNNELSE_MAX_LENGTH) {
                            nyBegrunnelse = nyBegrunnelse.substr(0, BEGRUNNELSE_MAX_LENGTH);
                        }
                        handleBegrunnelseChanged(nyBegrunnelse);
                    }}
                />
                <Hjelpesporsmal innsatsgruppe={innsatsgruppe} hovedmal={hovedmal}/>
            </div>
        </SkjemaElement>
    );

}

export default Begrunnelse;
