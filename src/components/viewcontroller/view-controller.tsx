import React, { useContext } from 'react';
import { ActionType } from './view-reducer';
import { Hovedside } from '../../pages/hovedside/hovedside';
import Skjema from '../../pages/skjema/skjema';
import { VisGjeldeneVedtakk } from '../../pages/gjeldenevedtak';
import { TilInnsending } from '../../pages/forhandsvisning/forhandsvisning';
import { ViewDispatch } from '../app-provider/app-provider';

function renderView(view: ActionType): ((props: any) => JSX.Element) {
    switch (view) {
        case ActionType.HOVEDSIDE:
            return Hovedside;
        case ActionType.UTKAST:
            return Skjema;
        case ActionType.GJELDENE_VEDTAK:
            return VisGjeldeneVedtakk;
        case ActionType.INNSENDING:
            return TilInnsending;
        default:
            return Skjema;
    }
}

export function ViewController (props: {fnr: string}) {
    const {viewState} = useContext(ViewDispatch);
    const Component = renderView(viewState.view);

    return (
        <Component fnr={props.fnr} props={viewState.props}/>
    );
}