import React, { useReducer } from 'react';
import { initialModalViewState, modalViewReducer } from '../modalcontroller/modal-reducer';

export const ModalViewDispatch = React.createContext<any>(null);

export function ModalViewProvider (props: {children: React.ReactNode}) {
    const [modalViewState, modalViewDispatch] = useReducer(modalViewReducer, initialModalViewState);

    return (
        <ModalViewDispatch.Provider value={{modalViewState, modalViewDispatch}}>
            {props.children}
        </ModalViewDispatch.Provider>
    );

}
