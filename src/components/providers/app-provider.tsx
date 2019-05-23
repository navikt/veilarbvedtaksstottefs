import React, { Dispatch, SetStateAction, useReducer, useState } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Status } from '../../utils/hooks/useFetch';
import { initialViewState, viewReducer } from '../viewcontroller/view-reducer';
import { SkjemaProvider } from './skjema-provider';

export interface AppState {
    setVedtak: Dispatch<SetStateAction<FetchVedtak>>;
    vedtak: FetchVedtak;
}

interface FetchVedtak {
    data: VedtakData[];
    status: Status;
}

const initialState = {
    vedtak: {
        status: Status.NOT_STARTED,
        data: []
    },
    setVedtak: () => {}, // tslint:disable-line no-empty
};

export const ViewDispatch = React.createContext<any>(null);
export const AppContext = React.createContext<AppState>(initialState);

export function AppProvider (props: {children: React.ReactNode}) {
    const [vedtak, setVedtak] = useState<FetchVedtak>(initialState.vedtak);
    const [viewState, viewDispatch] = useReducer(viewReducer, initialViewState);

    return (
        <AppContext.Provider value={{vedtak, setVedtak}}>
            <ViewDispatch.Provider value={{viewState: viewState, dispatch: viewDispatch}}>
                <SkjemaProvider>
                    {props.children}
                </SkjemaProvider>
            </ViewDispatch.Provider>
        </AppContext.Provider>
    );

}
