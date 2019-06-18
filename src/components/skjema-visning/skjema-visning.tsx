import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal-visning';
import { BegrunnelseVisning } from './begrunnelse-visning';
import { InnsatsgruppeVisning } from './innsatsgruppe-visning';
import { OpplysningerVisning } from './opplysninger-visning';
import { ActionType } from '../viewcontroller/view-reducer';
import { ViewDispatch } from '../providers/view-provider';
import './skjema-visning.less';

export function SkjemaVisning(props: {vedtak: VedtakData}) {
    const {dispatch} = useContext(ViewDispatch);
    const { id, hovedmal, opplysninger, innsatsgruppe, begrunnelse, beslutter } = props.vedtak;

    return (
        <>
            <OpplysningerVisning opplysninger={opplysninger}/>
            <BegrunnelseVisning begrunnelse={begrunnelse}/>
            <InnsatsgruppeVisning innsatsgruppe={innsatsgruppe} beslutter={beslutter}/>
            <HovedmalVisning hovedmal={hovedmal}/>
            <button
                className="lenke oyblikksbilde-lenke"
                onClick={() => dispatch({view: ActionType.VIS_VEDLEGG, props: {vedtakId: id}})}
             >
                Brukerinformasjon på vedtakstidspunktet
            </button>
        </>
    );
}
