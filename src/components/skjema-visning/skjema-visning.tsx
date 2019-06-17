import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal-visning';
import { BegrunnelseVisning } from './begrunnelse-visning';
import { InnsatsgruppeVisning } from './innsatsgruppe-visning';
import { OpplysningerVisning } from './opplysninger-visning';
import './skjema-visning.less';

export function SkjemaVisning(props: {vedtak: VedtakData}) {
    const { hovedmal, opplysninger, innsatsgruppe, begrunnelse} = props.vedtak;
    return (
        <>
            <HovedmalVisning hovedmal={hovedmal}/>
            <OpplysningerVisning opplysninger={opplysninger}/>
            <InnsatsgruppeVisning innsatsgruppe={innsatsgruppe}/>
            <BegrunnelseVisning begrunnelse={begrunnelse}/>
        </>
    );
}
