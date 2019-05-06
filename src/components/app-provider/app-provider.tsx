import React, { Dispatch, SetStateAction, useState} from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import { Status } from '../../utils/hooks/fetch-hook';
import { OrNothing } from '../../utils/types/ornothing';

export interface AppState {
    setUtkast: Dispatch<SetStateAction<FetchUtkast>>;
    setVedtak: Dispatch<SetStateAction<FetchVedtak>>;
    utkast: FetchUtkast;
    vedtak: FetchVedtak;
}

interface FetchUtkast {
    data: OrNothing<VedtakData>;
    status: Status;
}

interface FetchVedtak {
    data: VedtakData[];
    status: Status;
}

const initialState = {
    utkast: {
        status: Status.NOT_STARTED,
        data: undefined
    },
    vedtak: {
        status: Status.NOT_STARTED,
        data: []
    },
    setVedtak: () => {}, // tslint-disable-line no-empty
    setUtkast: () => {}, // tslint-disable-line no-empty
};

export const AppContext = React.createContext<AppState>(initialState);

export function AppProvider (props: {children: React.ReactNode}) {
    const [vedtak, setVedtak] = useState<FetchVedtak>(initialState.vedtak);
    const [utkast, setUtkast] = useState<FetchUtkast>(initialState.utkast);

    return (
        <AppContext.Provider value={{utkast, vedtak, setUtkast, setVedtak}}>
            {props.children}
        </AppContext.Provider>
    );

}
