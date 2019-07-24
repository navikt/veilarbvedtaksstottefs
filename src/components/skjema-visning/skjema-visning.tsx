import React, { useContext } from 'react';
import { VedtakData } from '../../rest/data/vedtak';
import { HovedmalVisning } from './hovedmal-visning';
import { BegrunnelseVisning } from './begrunnelse-visning';
import { InnsatsgruppeVisning } from './innsatsgruppe-visning';
import { OpplysningerVisning } from './opplysninger-visning';
import { useViewStoreContext, View } from '../../stores/view-store';
import './skjema-visning.less';

export function SkjemaVisning(props: {vedtak: VedtakData}) {
    const { changeView } = useViewStoreContext();
    const { id, hovedmal, opplysninger, innsatsgruppe, begrunnelse, beslutter } = props.vedtak;

    return (
        <>
            <InnsatsgruppeVisning innsatsgruppe={innsatsgruppe} beslutter={beslutter}/>
            <HovedmalVisning hovedmal={hovedmal}/>
            <BegrunnelseVisning begrunnelse={begrunnelse}/>
            <OpplysningerVisning opplysninger={opplysninger}/>
            <button
                className="lenke oyblikksbilde-lenke"
                onClick={() => changeView(View.VEDLEGG, { vedtakId: id})}
             >
                Brukerinformasjon på vedtakstidspunktet
            </button>
        </>
    );
}
