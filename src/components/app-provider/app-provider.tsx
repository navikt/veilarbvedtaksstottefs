import React from 'react';
import { VedtakData } from '../../utils/types/vedtak';
import fetchHook from '../../utils/hooks/fetch-hook';
import { OrNothing } from '../../utils/types/ornothing';

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
    const gjeldeVedtak = fetchHook<VedtakData>(`/veilarbvedtaksstotte/api/vedtak/${props.fnr}/gjelde`);
    const vedtakHistorikk = fetchHook<VedtakData[]>(`/veilarbvedtaksstotte/api/vedtak/${props.fnr}/historikk`);

    return (
        <AppContext.Provider value={{vedtakUtkast: vedtakUtkast.data, gjeldeneVedtak: gjeldeVedtak.data, vedtakHistorikk: vedtakHistorikk.data}}>
            {props.children}
        </AppContext.Provider>
    );

}
