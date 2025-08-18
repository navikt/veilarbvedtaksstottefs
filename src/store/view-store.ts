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

export type ViewProps =
	| { vedtakId: number } // For views that require vedtakId
	| { dokumentInfoId: string; journalpostId: string } // For ARENA_VEDTAK_PDF
	| { oyeblikksbildeType: string; vedtakId: number } // For VEDTAK_OYEBLIKKSBILDE_PDF
	| object; // For views that don't need any props

export const [ViewStoreProvider, useViewStore] = constate(() => {
	const [view, setView] = useState<ViewType>(() => {
		return hasHashParam('visUtkast') ? ViewType.UTKAST : ViewType.HOVEDSIDE;
	});
	const [viewProps, setViewProps] = useState<ViewProps>({});

	const changeView = (type: ViewType, props: ViewProps = {}) => {
		setView(type);
		setViewProps(props);
	};

	return { view, viewProps, changeView };
});
