import React from 'react';
import { useAppStoreContext } from './app-store';
import { useFetchStoreContext } from './fetch-store';
import { useViewStoreContext } from './view-store';

interface StoreProviderProps {
    fnr: string;
    enhetId?: string;
    children: React.ReactNode;
}

const StoreProvider = (props: StoreProviderProps) => {
    return (
        <useAppStoreContext.Provider fnr={props.fnr} enhetId={props.enhetId}>
            <useFetchStoreContext.Provider>
                <useViewStoreContext.Provider>
                    {props.children}
                </useViewStoreContext.Provider>
            </useFetchStoreContext.Provider>
        </useAppStoreContext.Provider>
    );
};

export default StoreProvider;
