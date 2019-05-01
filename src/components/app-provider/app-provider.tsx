import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import fetchHook, { Status } from '../../utils/hooks/fetch-hook';
import { OrNothing } from '../../utils/types/ornothing';
import NavFrontendSpinner from 'nav-frontend-spinner';
import { AlertStripeFeilSolid } from 'nav-frontend-alertstriper';

export interface AppState {
    vedtakUtkast: OrNothing<VedtakData>;
    vedtak: VedtakData[];
}

const initialState = {
    vedtakUtkast: null,
    vedtak: [],
};

export const VEILARBVEDTAKSSTOTTE_API = '/veilarbvedtaksstotte/api';

export const AppContext = React.createContext<AppState>(initialState);

export function AppProvider (props: {fnr: string, children: any}) {
    const vedtakUtkast = fetchHook<VedtakData>(`${VEILARBVEDTAKSSTOTTE_API}/${props.fnr}/utkast`);
    const vedtak = fetchHook<VedtakData[]>(`${VEILARBVEDTAKSSTOTTE_API}/${props.fnr}/vedtak`);

    const vedtakUtkastStatus = vedtakUtkast.status;
    const vedtakStatus = vedtak.status;

    if (vedtakUtkastStatus === Status.LOADING || vedtakStatus === Status.LOADING) {
        return <NavFrontendSpinner type="XL"/>;
    }

    if (vedtakUtkastStatus === Status.ERROR || vedtakStatus === Status.ERROR) {
        return <AlertStripeFeilSolid> Noe gikk galt </AlertStripeFeilSolid>;
    }

    return (
        <AppContext.Provider value={{vedtakUtkast: vedtakUtkast.data, vedtak: vedtak.data || []}}>
            {props.children}
        </AppContext.Provider>
    );

}
