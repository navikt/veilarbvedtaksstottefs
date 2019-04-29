import React from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal';
import { BegrunnelseVisning } from './begrunnelse';
import { InnsatsgruppeVisning } from './innsatsgruppe';

export function VedtakVisning (props: {vedtak: VedtakData}) {
    return (
       <div className="">
        <section>
            <HovedmalVisning hovedmal={props.vedtak.hovedmal}/>
            <InnsatsgruppeVisning innsatsgruppe={props.vedtak.innsatsgruppe}/>
            <BegrunnelseVisning begrunnelse={props.vedtak.begrunnelse}/>
        </section>
       </div>
    );
}