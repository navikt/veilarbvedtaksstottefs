import React from 'react';
import { useAppStore } from './app-store';
import { useFetchStore } from './fetch-store';
import { useViewStore } from './view-store';
import { useModalStore } from './modal-store';
import { SkjemaProvider } from './skjema-provider';

interface StoreProviderProps {
    fnr: string;
    enhetId?: string;
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <useAppStore.Provider fnr={props.fnr} enhetId={props.enhetId}>
            <useFetchStore.Provider>
                <useViewStore.Provider>
                    <useModalStore.Provider>
                        <SkjemaProvider>
                            {props.children}
                        </SkjemaProvider>
                    </useModalStore.Provider>
                </useViewStore.Provider>
            </useFetchStore.Provider>
        </useAppStore.Provider>
    );
};

export default StoreProvider;
