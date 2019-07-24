import React, { useState } from 'react';
import createUseContext from 'constate';

export enum View {
    HOVEDSIDE = 'HOVEDSIDE',
    UTKAST = 'UTKAST',
    INNSENDING = 'INNSENDING',
    VEDLEGG = 'VEDLEGG',
    VEDTAK = 'VEDTAK',
    VEDTAK_PDF = 'VEDTAK_PDF'
}

export const useViewStore = createUseContext(() => {
    const [view, setView] = useState<View>(View.HOVEDSIDE);
    const [viewProps, setViewProps] = useState<any>({});

    const changeView = (view: View, viewProps?: {}) => {
        setViewProps(viewProps ? viewProps : {});
        setView(view);
    };

    return { view, viewProps, changeView };
});
