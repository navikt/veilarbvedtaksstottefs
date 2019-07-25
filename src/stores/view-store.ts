import React, { useState } from 'react';
import createUseContext from 'constate';

export enum ViewType {
    HOVEDSIDE = 'HOVEDSIDE',
    UTKAST = 'UTKAST',
    FORHANDSVISNING = 'FORHANDSVISNING',
    VEDLEGG = 'VEDLEGG',
    VEDTAK = 'VEDTAK',
    VEDTAK_PDF = 'VEDTAK_PDF'
}

export const useViewStore = createUseContext(() => {
    const [view, setView] = useState<ViewType>(ViewType.HOVEDSIDE);
    const [viewProps, setViewProps] = useState<any>({});

    const changeView = (view: ViewType, viewProps?: {}) => {
        setViewProps(viewProps ? viewProps : {});
        setView(view);
    };

    return { view, viewProps, changeView };
});
