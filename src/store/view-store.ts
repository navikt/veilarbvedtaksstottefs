import { useState } from 'react';
import constate from 'constate';
import { hasHashParam } from '../util';

export enum ViewType {
	HOVEDSIDE = 'HOVEDSIDE',
	UTKAST = 'UTKAST',
	FORHANDSVISNING = 'FORHANDSVISNING',
	OYBLIKKSBILDE_VISNING = 'VEDLEGG',
	VEDTAK = 'VEDTAK',
	VEDTAK_PDF = 'VEDTAK_PDF',
	ARENA_VEDTAK_PDF = 'ARENA_VEDTAK_PDF',
	VEDTAK_OYEBLIKKSBILDE_PDF = 'VEDTAK_OYEBLIKKSBILDE_PDF'
}

export const [ViewStoreProvider, useViewStore] = constate(() => {
	const [view, setView] = useState<ViewType>(() => {
		return hasHashParam('visUtkast') ? ViewType.UTKAST : ViewType.HOVEDSIDE;
	});
	const [viewProps, setViewProps] = useState<object>({});

	const changeView = (type: ViewType, props: object = {}) => {
		setView(type);
		setViewProps(props);
	};

	return { view, viewProps, changeView };
});
