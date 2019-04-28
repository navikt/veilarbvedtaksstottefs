import React from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal';
import { BegrunnelseVisning } from './begrunnelse';
import { InnsatsgruppeVisning } from './innsatsgruppe';

export function SkjemaVisning (props: {skjema: VedtakData}) {
    return (
       <div className="">
        <section>
            <HovedmalVisning hovedmal={props.skjema.hovedmal}/>
            <InnsatsgruppeVisning innsatsgruppe={props.skjema.innsatsgruppe}/>
            <BegrunnelseVisning begrunnelse={props.skjema.begrunnelse}/>
        </section>
       </div>
    );
}