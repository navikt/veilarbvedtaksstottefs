import * as React from 'react';
import { Textarea } from 'nav-frontend-skjema';
import { SkjemaElement } from '../skjemaelement/skjemaelement';
import { InnsatsgruppeType } from '../innsatsgruppe/innsatsgruppe';
import { OrNothing } from '../../../utils/types/ornothing';
import { HovedmalType } from '../hovedmal/hovedmal';
import Hjelpesporsmal from './hjelpesporsmal/hjelpesporsmal';
import './begrunnelse.less';

interface BegrunnelseProps  {
    begrunnelseTekst: string;
    handleBegrunnelseChanged: (e: any) => void;
    innsatsgruppe: OrNothing<InnsatsgruppeType>;
    hovedmal: OrNothing<HovedmalType>;
}

function Begrunnelse (props: BegrunnelseProps) {
    const { begrunnelseTekst, handleBegrunnelseChanged, innsatsgruppe, hovedmal } = props;
    return (
        <SkjemaElement tittel="Begrunnelse" className="begrunnelse">
            <Textarea
                value={begrunnelseTekst}
                label=""
                placeholder="Skriv inn begrunnelsen for vedtaket"
                maxLength={1000}
                onChange={(e: any) => handleBegrunnelseChanged(e.target.value)}
            />
            <div>
                <Hjelpesporsmal innsatsgruppe={innsatsgruppe} hovedmal={hovedmal}/>
            </div>
        </SkjemaElement>
    );

}

export default Begrunnelse;
