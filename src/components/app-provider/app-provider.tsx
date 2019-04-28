import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import fetchHook, { Status } from '../../utils/hooks/fetch-hook';
import { OrNothing } from '../../utils/types/ornothing';
import NavFrontendSpinner from 'nav-frontend-spinner';

export interface AppState {
    vedtakUtkast: OrNothing<VedtakData>;
    gjeldeneVedtak: OrNothing<VedtakData>;
    vedtakHistorikk: OrNothing<VedtakData[]>;
}

const initialState = {
    vedtakUtkast: null,
    gjeldeneVedtak: null,
    vedtakHistorikk: null,
};

export const AppContext = React.createContext<AppState>(initialState);

export function AppProvider (props: {fnr: string, children: any}) {
    const vedtakUtkast = fetchHook<VedtakData>(`/veilarbvedtaksstotte/api/vedtak/${props.fnr}/utkast`);
    const gjeldeneVedtak = fetchHook<VedtakData>(`/veilarbvedtaksstotte/api/vedtak/${props.fnr}/gjeldene`);
    const vedtakHistorikk = fetchHook<VedtakData[]>(`/veilarbvedtaksstotte/api/vedtak/${props.fnr}/historikk`);

    if (vedtakUtkast.status !== Status.DONE || vedtakHistorikk.status !== Status.DONE || gjeldeneVedtak.status !== Status.DONE) {
        return <NavFrontendSpinner type="XL"/>;
    }

    return (
        <AppContext.Provider value={{vedtakUtkast: vedtakUtkast.data, gjeldeneVedtak: gjeldeneVedtak.data, vedtakHistorikk: vedtakHistorikk.data}}>
            {props.children}
        </AppContext.Provider>
    );

}
