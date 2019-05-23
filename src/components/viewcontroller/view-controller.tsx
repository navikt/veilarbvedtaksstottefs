import React, { useContext } from 'react';
import { ActionType } from './view-reducer';
import { Hovedside } from '../../pages/hovedside/hovedside';
import { VisVedtak } from '../../pages/visvedtak';
import { TilInnsending } from '../../pages/forhandsvisning/forhandsvisning';
import { ViewDispatch } from '../app-provider/app-provider';
import { VedleggVisning } from '../../pages/vedlegg-visning/vedlegg-visning';
import { VedtakbrevPdfVisning } from '../../pages/vedtakbrevpdf-visning/vedtakbrevpdf-visning';
import { Vedtakskjema } from '../../pages/skjema/vedtakskjema';

function renderView(view: ActionType): ((props: any) => JSX.Element) {
    switch (view) {
        case ActionType.HOVEDSIDE:
            return Hovedside;
        case ActionType.UTKAST:
            return Vedtakskjema;
        case ActionType.VIS_VEDTAK:
            return VisVedtak;
        case ActionType.INNSENDING:
            return TilInnsending;
        case ActionType.VIS_VEDLEGG:
            return VedleggVisning;
        case ActionType.VIS_VEDTAK_PDF:
            return VedtakbrevPdfVisning;
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
