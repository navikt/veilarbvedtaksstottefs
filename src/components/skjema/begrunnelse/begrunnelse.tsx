import * as React from 'react';
import { SkjemaGruppe, Textarea } from 'nav-frontend-skjema';
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
       <SkjemaGruppe feil={props.begrunnelsefeil ? {feilmelding : props.begrunnelsefeil} : undefined}>
        <SkjemaElement tittel="Begrunnelse" className="begrunnelse">
            <Textarea
                value={begrunnelseTekst}
                label=""
                placeholder="Skriv inn begrunnelsen for vedtaket"
                maxLength={BEGRUNNELSE_MAX_LENGTH}
                onChange={(e: any) => handleBegrunnelseChanged(e.target.value)}
            />
            <div>
                <Hjelpesporsmal innsatsgruppe={innsatsgruppe} hovedmal={hovedmal}/>
            </div>
        </SkjemaElement>
       </SkjemaGruppe>
    );

}

export default Begrunnelse;
