import React, { useReducer } from 'react';
import { initialViewState, viewReducer } from '../viewcontroller/view-reducer';

export const ViewDispatch = React.createContext<any>(null);

export function ViewProvider (props: {children: React.ReactNode}) {
    const [viewState, viewDispatch] = useReducer(viewReducer, initialViewState);

    return (
        <ViewDispatch.Provider value={{viewState: viewState, dispatch: viewDispatch}}>
            {props.children}
        </ViewDispatch.Provider>
    );

}
