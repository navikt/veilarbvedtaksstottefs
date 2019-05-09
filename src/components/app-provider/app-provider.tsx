import React, { Dispatch, SetStateAction, useState } from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Status } from '../../utils/hooks/fetch-hook';

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

export const AppContext = React.createContext<AppState>(initialState);

export function AppProvider (props: {children: React.ReactNode}) {
    const [vedtak, setVedtak] = useState<FetchVedtak>(initialState.vedtak);

    return (
        <AppContext.Provider value={{vedtak, setVedtak}}>
            {props.children}
        </AppContext.Provider>
    );

}
