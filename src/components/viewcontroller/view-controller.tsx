import React, { useContext } from 'react';
import { ActionType } from './view-reducer';
import { Hovedside } from '../../pages/hovedside/hovedside';
import { VisVedtak } from '../../pages/visvedtak';
import { Forhandsvisning } from '../../pages/forhandsvisning/forhandsvisning';
import { ViewDispatch } from '../providers/view-provider';
import { OyblikksbildeVisning } from '../../pages/oyblikksbilde-visning/oyblikksbilde-visning';
import { VedtaksbrevVisning } from '../../pages/vedtaksbrev-visning/vedtaksbrev-visning';
import { VedtakskjemaSide } from '../../pages/vedtakskjema/vedtakskjema-side';

function renderView(view: ActionType): ((props: any) => JSX.Element) {
    switch (view) {
        case ActionType.HOVEDSIDE:
            return Hovedside;
        case ActionType.UTKAST:
            return VedtakskjemaSide;
        case ActionType.VIS_VEDTAK:
            return VisVedtak;
        case ActionType.INNSENDING:
            return Forhandsvisning;
        case ActionType.VIS_VEDLEGG:
            return OyblikksbildeVisning;
        case ActionType.VIS_VEDTAK_PDF:
            return VedtaksbrevVisning;
        default:
            return Hovedside;
    }
}

export function ViewController (props: {fnr: string}) {
    const {viewState} = useContext(ViewDispatch);
    const Component = renderView(viewState.view);
    return (
        <Component {...Object.assign(viewState.props || {}, {fnr: props.fnr})}/>
    );
}
