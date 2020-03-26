import React from 'react';
import { useEventListener } from '../utils/hooks';
import { useViewStore, ViewType } from '../stores/view-store';

export const TabClickedListener = () => {
	const { changeView } = useViewStore();

	useEventListener('veilarbpersonflatefs.tab-clicked', (event) => {
		if (event instanceof CustomEvent && event.detail.tabId === 'VEDTAKSSTOTTE') {
			changeView(ViewType.HOVEDSIDE);
		}
	});

    return null;
};
