import React, { useContext } from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal';
import { BegrunnelseVisning } from './begrunnelse';
import { InnsatsgruppeVisning } from './innsatsgruppe';
import { Knapp } from 'nav-frontend-knapper';
import { ActionType } from '../../viewcontroller/view-reducer';
import { ViewDispatch } from '../../app-provider/app-provider';
import vedtak from '../../../mock/vedtak';
import { Sidetittel } from 'nav-frontend-typografi';

export function VedtakVisning (props: {vedtak: VedtakData}) {
    const {dispatch} = useContext(ViewDispatch);
    return (
        <section>
            <HovedmalVisning hovedmal={props.vedtak.hovedmal}/>
            <InnsatsgruppeVisning innsatsgruppe={props.vedtak.innsatsgruppe}/>
            <BegrunnelseVisning begrunnelse={props.vedtak.begrunnelse}/>
            <Knapp onClick={() => dispatch({view: ActionType.VIS_VEDLEGG, props: {vedtakId: props.vedtak.id,}})}>
                Brukerinformasjon på vedtakstidspunktet
            </Knapp>
        </section>
    );
}
