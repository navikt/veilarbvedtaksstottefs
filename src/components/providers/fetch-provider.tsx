import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import { VedtakData } from '../../utils/types/vedtak';
import UnderOppfolging from '../../utils/types/under-oppfolging';
import { FetchState, initialFetchState } from '../../utils/fetch-utils';

export interface AppFetchState {
    vedtak: FetchState<VedtakData[]>;
    underOppfolging: FetchState<UnderOppfolging>;
}

const initialState: AppFetchState = {
    vedtak: initialFetchState,
    underOppfolging: initialFetchState
};

export const { GlobalStateProvider: FetchStateProvider, useGlobalState: useFetchState } = createGlobalState(initialState);

export function FetchProvider (props: {children: React.ReactNode}) {
    return (
        <FetchStateProvider>
            {props.children}
        </FetchStateProvider>
    );
}
