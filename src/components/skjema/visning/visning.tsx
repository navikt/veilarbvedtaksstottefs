import React, { useContext } from 'react';
import { VedtakData } from '../../../utils/types/vedtak';
import { HovedmalVisning } from './hovedmal';
import { BegrunnelseVisning } from './begrunnelse';
import { InnsatsgruppeVisning } from './innsatsgruppe';
import { Flatknapp, Knapp } from 'nav-frontend-knapper';
import { ActionType } from '../../viewcontroller/view-reducer';
import { ViewDispatch } from '../../providers/app-provider';
import './visning.less';
import { Sidetittel } from 'nav-frontend-typografi';
import { Opplysninger } from './opplysninger';

export function VedtakVisning (props: {vedtak: VedtakData}) {
    const {dispatch} = useContext(ViewDispatch);
    return (
        <div className="vedtaksvisnig">
            <Sidetittel tag="h3">Oppfølgingsvedtak</Sidetittel>
            <HovedmalVisning hovedmal={props.vedtak.hovedmal}/>
            <Opplysninger opplysninger={props.vedtak.opplysninger}/>
            <InnsatsgruppeVisning innsatsgruppe={props.vedtak.innsatsgruppe}/>
            <BegrunnelseVisning begrunnelse={props.vedtak.begrunnelse}/>
            <div className="vedtaksvisnig__aksjoner">
                <Knapp onClick={() => dispatch({view: ActionType.VIS_VEDTAK_PDF, props: {vedtakId: props.vedtak.id}})}>Vis vedtaksbrev</Knapp>
                <Flatknapp onClick={() => dispatch({view: ActionType.VIS_VEDLEGG, props: {vedtakId: props.vedtak.id}})}>
                    Brukerinformasjon på vedtakstidspunktet
                </Flatknapp>
            </div>
        </div>
    );
}
