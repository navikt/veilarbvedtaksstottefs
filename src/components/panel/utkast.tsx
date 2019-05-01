import React, { useContext } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { OrNothing } from '../../utils/types/ornothing';
import './panel.less';
import { ViewDispatch } from '../viewcontroller/view-controller';
import { VedtakstottePanel } from './vedtakstotte-panel';
import { SistEndret } from './sist-endret';
import { EndretAv } from './endret-av';
import { Hovedknapp } from 'nav-frontend-knapper';
import { ActionType } from '../viewcontroller/view-reducer';

export function Utkast(props: {utkast: OrNothing<VedtakData>}) {
    const {dispatch} = useContext(ViewDispatch);

    if (!props.utkast) {
        return null;
    }
    return (
        <VedtakstottePanel tittel="Utkast til oppfølgingsvedtak">
            <Undertittel>Utkast</Undertittel>
            <Normaltekst>Her kommer det tekst at det er påbygynt vedtak</Normaltekst>
            <SistEndret sistOppdatert={props.utkast.sistOppdatert}/>
            <EndretAv endretAv={props.utkast.veileder}/>
            <Hovedknapp onClick={() => dispatch({view: ActionType.UTKAST})}>Endre</Hovedknapp>
        </VedtakstottePanel>
    );
}