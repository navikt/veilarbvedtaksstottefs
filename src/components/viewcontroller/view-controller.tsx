import React, { useReducer } from 'react';
import { ActionType, initialViewState, viewReducer } from './view-reducer';
import { Hovedside } from '../../pages/hovedside/hovedside';
import Skjema from '../../pages/skjema/skjema';
import { VisGjeldeneVedtakk } from '../../pages/gjeldenevedtak';
import { TilInnsending } from '../../pages/forhandsvisning/forhandsvisning';

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
            return Hovedside;
    }
}

export const ViewDispatch = React.createContext<any>(null);

export function ViewController (props: {fnr: string}) {
    const [viewState, viewDispatch] = useReducer(viewReducer, initialViewState);
    const Component = renderView(viewState.view);

    return (
        <ViewDispatch.Provider value={{dispatch: viewDispatch}}>
            <Component fnr={props.fnr} props={viewState.props}/>
        </ViewDispatch.Provider>
    );
}